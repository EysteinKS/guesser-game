import { firestore, auth } from "./firebase";
import { SessionStore, UserStore } from "../store/Store"

const sessionRef = firestore.collection("Sessions");
const liveSessionsRef = sessionRef.doc("SessionData").collection("LiveSessions");
const usersRef = firestore.collection("Users");

//Creation

export const createSession = () => {
    let sessionHost = { host: UserStore["Username"] }
    console.log(`Creating session with ${UserStore["Username"]} as host`)
    liveSessionsRef.add(sessionHost)
        .then((docRef) => {
            SessionStore.set({ ["sessionID"]: docRef.id })
            generateKey(docRef.id)
            setKey()
            joinSession(SessionStore["sessionID"])
            //Send host to lobby page
        })
        .catch((error) => console.log(error))
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

//Used to turn number into key from keyGeneratorEnum
const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

//Calculates a new enum from number
const calculateEnum = (stringEnum) => {
    console.log("Current stringEnum is", stringEnum)
    let returnKey;

    if (stringEnum > 62) {
        stringEnum = stringEnum - 62
        console.log("stringEnum is greater than 62, recursive function activated")
        calculateEnum(stringEnum)
    } else {
        console.log("Returning stringEnum of", stringEnum)
        returnKey = getKeyByValue(keyGeneratorEnum, stringEnum)
        console.log("The returned key is", returnKey)
        SessionStore.set({ ["returnKey"]: returnKey })
    }
}

//Generates the session key
export const generateKey = session => {

    let sessionString = session.toString()
    let sessionKey = "";

    console.log("SessionID is ", sessionString)

    let firstSubString = sessionString.substring(0, 4)
    let secondSubString = sessionString.substring(4, 8)
    let thirdSubString = sessionString.substring(8, 12)
    let fourthSubString = sessionString.substring(12, 16)
    let fifthSubString = sessionString.substring(16)

    console.log(`First string is ${firstSubString}, second is ${secondSubString}, third is ${thirdSubString}, fourth is ${fourthSubString} and fifth is ${fifthSubString}`)

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

        console.log(`Current symbol collection is ${currentSymbolCollection}`)

        for ( let j = 0; j < 4; j++) {
            let symbolValue = keyGeneratorEnum[symbolCollection.charAt(j)]
            currentCharValues.push(symbolValue)
            console.log(`${symbolCollection.charAt(j)} has a value of ${symbolValue}`)
        }

        postCalcObject[currentSymbolCollection] = currentCharValues.reduce((total, amount) => total + amount)
        console.log(`Total value of ${preCalcArray[i]} is ${postCalcObject[currentSymbolCollection]}`)
        
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
    liveSessionsRef.doc(SessionStore["sessionID"]).update({ sessionID: SessionStore["SessionKey"] })
        .then(() => console.log("Key saved in session database"))
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
    usersRef.doc(UserStore["uid"]).update({ ActiveSession: session })
    //Push user to lobby page
}

export const kickPlayer = () => {

}

export const startSession = () => {

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

}

export const showResults = () => {

}

export const saveSessionData = () => {

}