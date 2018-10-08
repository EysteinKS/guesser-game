import { Listenable } from "pockito";

export const Store = new Listenable({
    initialState: {
        login: "false"
    }
})