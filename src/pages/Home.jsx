import React, {Component} from "react";
import { firestore } from "../firebase/index"
import { Store } from "../store/Store"

//TODO
//MOVE THIS STUFF AWAY FROM HOME!!!
//CHECK OUT lodash.random TO GET RANDOM WORD FROM DOCUMENT

class Home extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onChange)
        this.state = {
            loadedWord: false
        }
    }

    componentWillMount() {
        firestore.getWordByDifficultyAndLanguage("English", "Easy", `Word${Store["wordDoc"]}`)
        firestore.getLengthOfDifficulty("English", "Easy");
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange)
    }

    onClick = () => {
        console.log("Button Clicked")
        if (this.state.loadedWord == false){
            this.setState({ loadedWord: !this.state.loadedWord})
        }
        if (Store["wordDoc"] < Store["DifficultyLength"]){
            Store.set({ ["wordDoc"]: (Number(Store["wordDoc"]) + 1)})
            console.log()
        } else {
            Store.set({ ["wordDoc"]: 1 })
        }
        firestore.getWordByDifficultyAndLanguage("English", "Easy", `Word${Store["wordDoc"]}`);
    }

    onChange = () => {
        this.forceUpdate()
    }

    render(){

        return(
            <section>
                <h1>Home</h1>
                <button onClick={this.onClick}>Get English Dictionary</button>
                <ul>
                    <li>Current word is Word{Store["wordDoc"]}</li>
                    <li>{Store["currentWord"]}</li>
                    <li>{Store["currentType"]}</li>
                    <li>{Store["currentCategory"]}</li>
                </ul>
            </section>
        )
    }
}

export default Home;