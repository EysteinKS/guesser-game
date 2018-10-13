import { firestore, auth } from "./firebase";
import { SessionStore, UserStore } from "../store/Store"

const sessionRef = firestore.collection("Sessions");
const liveSessionsRef = sessionRef.doc("SessionData").collection("LiveSessions");
const usersRef = firestore.collection("Users");

//Session Time

const addZero = time => {
    if (time < 10) {
        time = "0" + time;
        return time;
    } else {
        return time;
    }
};

export const getTimeStamp = () => {
    let thisDate = new Date()
    console.log(thisDate)
    let dateObj = {
        currentYear: thisDate.getFullYear(),
        currentMonth: addZero(thisDate.getMonth() + 1),
        currentDay: addZero(thisDate.getDate()),
        currentHour: addZero(thisDate.getHours()),
        currentMinute: addZero(thisDate.getMinutes()),
        currentSeconds: addZero(thisDate.getSeconds()),
    }
    console.log(`Current Time is ${dateObj.currentDay}/${dateObj.currentMonth}/${dateObj.currentYear} ${dateObj.currentHour}:${dateObj.currentMinute}:${dateObj.currentSeconds}`)
    SessionStore.set({["currentTime"]: `${dateObj.currentDay}/${dateObj.currentMonth}/${dateObj.currentYear} ${dateObj.currentHour}:${dateObj.currentMinute}:${dateObj.currentSeconds}` })
}

//Active Sessions and Players

export const changeActiveSessions = ( changeType ) => {
    sessionRef.doc("SessionData").get()
        .then((docRef) => {
            let currentActiveSessions = docRef.data().activeSessions
            console.log("Changing activeSessions, current value is", currentActiveSessions)

            switch(changeType){
                case("add"):
                    sessionRef.doc("SessionData").update({ activeSessions: currentActiveSessions + 1 })
                    currentActiveSessions = docRef.data().activeSessions
                    console.log("Active Session added to SessionData. Current activeSessions:", currentActiveSessions + 1)
                    break;
                case("remove"):
                    currentActiveSessions = docRef.data().activeSessions
                    sessionRef.doc("SessionData").update({ activeSessions: currentActiveSessions - 1 })
                    console.log("Active Session removed to SessionData. Current activeSessions:", currentActiveSessions - 1)
                    break;
                default:
                    console.log("changeType missing, Active Sessions is unchanged")
                    break;
            }
        })
        .catch((error) => console.log(error))
}

export const updateActivePlayers = ( changeType ) => {
    let action;
    switch(changeType){
        case("add"):
            //Create if statement that sees if player is already in the players subcollection
            action = Number(SessionStore["activePlayers"]) + 1
            console.log("Adding activePlayer")
            addPlayerToSessionPlayers()
            break;
        case("remove"):
            console.log("Removing activePlayer")
            action = Number(SessionStore["activePlayers"]) - 1
            break;
        default:
            console.log("switch(changeType) input is empty, running default")
            break;
    }
    console.log("Changing active players in", UserStore["ActiveSession"] + " to", action)
    liveSessionsRef.doc(UserStore["ActiveSession"]).update({ activePlayers: action })
        .then(() => {
            SessionStore.set({ activePlayers: action })
            console.log("Updated current active players in session to", SessionStore["activePlayers"])
            if (SessionStore["activePlayers"] < 1) {
                closeLobby()
            }
            if (UserStore["isInLobby"] == "false"){
                UserStore.set({ ["ActiveSession"]: "" })
                //Create function for changing ActiveSession in firestore
            }
        })
        .catch((error) => console.log(error))
}

export const addPlayerToSessionPlayers = () => {
    liveSessionsRef.doc(UserStore["ActiveSession"]).collection("Players").doc(UserStore["Username"]).set({
        username: UserStore["Username"],
        userid: UserStore["uid"],
        ready: "true",
        totalPoints: 0,
        inSession: true
    })
        .then(() => console.log(`${UserStore["Username"]} saved in sessionKey ${SessionStore["SessionKey"]}`))
        .catch((error) => console.log(error))
}

export const removePlayerFromSessionPlayers = () => {

}

export const kickPlayer = () => {

}

//Creation

export const createSession = () => {
    let sessionHost = { host: UserStore["Username"], activePlayers: 1, openSession: true, }
    UserStore.set({ isHost: "true" })
    console.log(`Creating session with ${UserStore["Username"]} as host`)
    getTimeStamp()
    liveSessionsRef.add(sessionHost)
        .then((docRef) => {
            SessionStore.set({ ["sessionID"]: docRef.id })
            generateKey(docRef.id)
            setKey()
            createReferenceKey()
            setRules()
            docRef.update({ sessionStarted: false, lobbyCreated: SessionStore["currentTime"] })
            joinSession(SessionStore["sessionID"])
            changeActiveSessions("add")
            //Send host to lobby page
        })
        .catch((error) => console.log(error))
}


export const setRules = () => {

}

export const changeRule = ( ruleKey, newRule ) => {

}

export const lockSession = () => {

}

export const joinSession = ( session ) => {
    console.log(`Adding user ${UserStore["Username"]} with uid ${UserStore["uid"]} to session ${session}`)
    if (UserStore["isHost"] == "false"){
        translateKeyToSessionID(session)
    } else {
        SessionStore.set({["activePlayers"]: "0"})
        UserStore.set({ ["ActiveSession"]: session })
        joinSessionHost()
    }
    //Push user to lobby page
}

export const joinSessionHost = () => {
    usersRef.doc(UserStore["uid"]).update({ ActiveSession: UserStore["ActiveSession"], ActiveKey: SessionStore["SessionKey"], hasActiveSession: true })
        .then(() => {
            usersRef.doc(UserStore["uid"]).update({ isInLobby: true })
            addSessionStateListener()
            updateActivePlayers("add")
            UserStore.set({ ["isInLobby"]: "true", ["hasActiveSession"]: "true" })
        })
        .catch((error) => console.log(error))
    console.log("Active session in store at joinSession is", UserStore["ActiveSession"])

}

export const joinSessionNonHost = () => {
    usersRef.doc(UserStore["uid"]).update({ ActiveSession: UserStore["ActiveSession"], ActiveKey: SessionStore["SessionKey"], hasActiveSession: true })
        .then(() => {
            usersRef.doc(UserStore["uid"]).update({ isInLobby: true })
            addSessionStateListener()
            UserStore.set({ ["isInLobby"]: "true", ["hasActiveSession"]: "true" })
        })
        .catch((error) => console.log(error))
    console.log("Active session in store at joinSession is", UserStore["ActiveSession"])

}

export const startSession = () => {
    console.log(`Starting session with SessionID ${SessionStore["sessionID"]}`)
    liveSessionsRef.doc(SessionStore["sessionID"]).update({ sessionStarted: true })
        .then(() => {
            usersRef.doc(UserStore["uid"]).update({ hasActiveSession: true })
            UserStore.set({ ["hasActiveSession"]: "true" })
            console.log("Current players in lobby is", SessionStore["activePlayers"])
        })
        .catch((error) => console.log(error))
}

export const addSessionStateListener = () => {
    let hasUpdatedActivePlayers = false
    liveSessionsRef.doc(UserStore["ActiveSession"])
        .onSnapshot((docRef) => {
            if (UserStore["isInLobby"] == "true"){
                SessionStore.set({["activePlayers"]: docRef.data().activePlayers})
                console.log("SessionStateListener updated, activePlayers is", docRef.data().activePlayers)
                
                if(UserStore["isHost"] == "false" && hasUpdatedActivePlayers == false){
                    updateActivePlayers("add")
                    hasUpdatedActivePlayers = true
                }

            } else {
                console.log("Player not in lobby, removing listener...")
            }
        })
}

export const removeSessionStateListener = () => {
    console.log("Removing SessionStateListener")
    liveSessionsRef.doc(UserStore["ActiveSession"])
        .onSnapshot(() => {})
}

export const leaveSession = () => {
    console.log("Current activePlayers in session is", SessionStore["activePlayers"])
    usersRef.doc(UserStore["uid"]).update({ hasActiveSession: false, isInLobby: false, ActiveSession: "", SessionKey: SessionStore["SessionKey"] })
        .then(() => {
            removeSessionStateListener()
            UserStore.set({ ["hasActiveSession"]: "false", ["isInLobby"]: "false", ["isHost"]: "false", ["SessionKey"]: SessionStore["SessionKey"] })
            console.log("Left Session")
            updateActivePlayers("remove")
        })
        .catch((error) => console.log("Unable to leave session, error", error))
}


export const closeLobby = () => {
    liveSessionsRef.doc(SessionStore["sessionID"]).delete()
        .then(() => {
            removeReferenceKey()
            sessionRef.doc("SessionData").collection("SessionKeyReference").doc(SessionStore["SessionKey"]).delete()
            changeActiveSessions("remove")
            console.log("Lobby closed")
        })
        .catch((error) => console.log("Error closing lobby", error))
}

const keyGeneratorEnum = {
    "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 10,
    "a": 11, "b": 12, "c": 13, "d": 14, "e": 15, "f": 16, "g": 17, "h": 18, "i": 19, "j": 20,
    "k": 21, "l": 22, "m": 23, "n": 24, "o": 25, "p": 26, "q": 27, "r": 28, "s": 29, "t": 30,
    "u": 31, "v": 32, "w": 33, "x": 34, "y": 35, "z": 36,
    "A": 37, "B": 38, "C": 39, "D": 40, "E": 41, "F": 42, "G": 43, "H": 44, "I": 45, "J": 46,
    "K": 47, "L": 48, "M": 49, "N": 50, "O": 51, "P": 52, "Q": 53, "R": 54, "S": 55, "T": 56,
    "U": 57, "V": 58, "W": 59, "X": 60, "Y": 61, "Z": 62
}
Object.freeze(keyGeneratorEnum)

//KEYS

//Used to turn number into key from keyGeneratorEnum
const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

//Calculates a new enum from number
const calculateEnum = (stringEnum) => {
    let returnKey;

    if (stringEnum > 62) {
        stringEnum = stringEnum - 62
        calculateEnum(stringEnum)
    } else {
        returnKey = getKeyByValue(keyGeneratorEnum, stringEnum)
        SessionStore.set({ ["returnKey"]: returnKey })
    }
}

//Generates the session key
export const generateKey = session => {

    let sessionString = session.toString()
    let sessionKey = "";

    let firstSubString = sessionString.substring(0, 4)
    let secondSubString = sessionString.substring(4, 8)
    let thirdSubString = sessionString.substring(8, 12)
    let fourthSubString = sessionString.substring(12, 16)
    let fifthSubString = sessionString.substring(16)

    let preCalcObject = {
        firstSymbol: firstSubString,
        secondSymbol: secondSubString,
        thirdSymbol: thirdSubString,
        fourthSymbol: fourthSubString,
        fifthSymbol: fifthSubString
    }
    let preCalcArray = [
        "firstSymbol",
        "secondSymbol",
        "thirdSymbol",
        "fourthSymbol",
        "fifthSymbol"
    ]
    let postCalcObject = { firstSymbol: "", secondSymbol: "", thirdSymbol: "", fourthSymbol: "", fifthSymbol: "" }

    for ( let i = 0; i < preCalcArray.length; i++) {

        let currentCharValues = []
        let currentSymbolCollection = preCalcArray[i]
        let symbolCollection = preCalcObject[currentSymbolCollection]


        for ( let j = 0; j < 4; j++) {
            let symbolValue = keyGeneratorEnum[symbolCollection.charAt(j)]
            currentCharValues.push(symbolValue)
        }

        postCalcObject[currentSymbolCollection] = currentCharValues.reduce((total, amount) => total + amount)
        
        let keyToSymbol = calculateEnum(postCalcObject[currentSymbolCollection])
        keyToSymbol = SessionStore["returnKey"]
        sessionKey = sessionKey.toString() + keyToSymbol.toString()
    }
    console.log("The session key is", sessionKey)
    SessionStore.set({ ["SessionKey"]: sessionKey })
}

//Sets the key in session database, and stores it so people can join the session
export const setKey = () => {
    console.log(`Saving key as ${SessionStore["SessionKey"]} to sessionID ${SessionStore["sessionID"]}`)
    liveSessionsRef.doc(SessionStore["sessionID"]).update({ sessionKey: SessionStore["SessionKey"] })
        .then(() => console.log("Key saved in session database"))
        .catch((error) => console.log(error))
}

export const createReferenceKey = () => {
    console.log("Creating reference to key", SessionStore["SessionKey"])
    sessionRef.doc("SessionData").collection("SessionKeyReference").doc(SessionStore["SessionKey"]).set({ SessionID: SessionStore["sessionID"] })
        .then(() => console.log("Session reference created"))
        .catch((error) => console.log(error))
}

export const removeReferenceKey = () => {
    sessionRef.doc("SessionData").collection("SessionKeyReference").doc(SessionStore["SessionKey"]).delete()
        .then(() => console.log("Session reference deleted"))
        .catch((error) => console.log(error))
}

export const translateKeyToSessionID = ( sessionKey ) => {
    sessionRef.doc("SessionData").collection("SessionKeyReference").doc(sessionKey).get()
        .then((docRef) => {
            UserStore.set({ ["ActiveSession"]: docRef.data().SessionID })
            SessionStore.set({ ["SessionKey"]: sessionKey })
            console.log("Player isn't host, translated SessionKey to SessionID")
            console.log("ActiveSession in UserStore is ", UserStore["ActiveSession"])
            joinSessionNonHost()
        })
        .catch((error) => {
            console.log("SessionKey doesn't exist")
            SessionStore.set({["SessionJoinState"]: "Session doesn't exist"})
        })
}


//Active session

export const startRound = () => {

}

export const givePoint = ( currentPlayer, guesser ) => {

}

export const skipWord = () => {

}

export const pauseRound = () => {

}

export const resumeRound = () => {

}

export const endRound = () => {

}

//Finishing session

export const endSession = () => {
    //Delete session key reference
}

export const showResults = () => {

}

export const saveSessionData = () => {

}