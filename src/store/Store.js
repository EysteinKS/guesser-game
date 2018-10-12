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
    initialstate: {
        Username: "",
        Permission: "",
        userDataLoaded: ""
    }
})

export const SessionStore = new Listenable({
    initialstate: {
        sessionID: ""
    }
})