import { Listenable } from "pockito";

export const Store = new Listenable({
    initialState: {
        login: "false",
        dictionary: "",
        wordDoc: "1",
        currentWord: "",
        currentType: "",
        currentCategory: "",
        DifficultyLength: "",
        EasyLength: "",
        MediumLength: "",
        HardLength: "",
        createWordCondition: "Ready to submit new word",
        loggedIn: "false",
    }
})

export const UserStore = new Listenable({
    initialState: {
        Username: "",
        uid: "",
        Permission: "",
        userDataLoaded: "",
        isInLobby: "",
        hasActiveSession: "",
        hadActiveSession: "",
        isHost: "false",
        ActiveSession: "",
        ActiveSessionKey: "",
        createdNewLobby: "false"
    }
})

export const SessionStore = new Listenable({
    initialState: {
        sessionID: "",
        uid: "",
        returnKey: "",
        SessionKey: "",
        SessionJoinState: "Ready to join session",
        activePlayers: "",
        currentTime: ""
    }
})