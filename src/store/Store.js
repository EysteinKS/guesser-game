import { Listenable } from "pockito";

export const Store = new Listenable({
    initialState: {
        login: "false",
        dictionary: "",
        currentWord: "",
        currentType: "",
        DifficultyLength: "",
        createWordCondition: "Ready to submit new word",
    }
})