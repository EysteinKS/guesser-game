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
        createWordCondition: "Ready to submit new word",
    }
})