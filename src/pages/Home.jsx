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
            loadedWord: false,
            chooseLanguage: "English",
            chooseDifficulty: "Easy",
        }
    }

    componentWillMount() {
        firestore.getWordByDifficultyAndLanguage(this.state.chooseLanguage, this.state.chooseDifficulty, `Word${Store["wordDoc"]}`)
        firestore.getLengthOfDifficulty(this.state.chooseLanguage, this.state.chooseDifficulty);
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
        firestore.getWordByDifficultyAndLanguage(this.state.chooseLanguage, this.state.chooseDifficulty, `Word${Store["wordDoc"]}`);
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value })

    render(){

        return(
            <section>
                <h1>Home</h1>
                <form>
                    <select name="chooseLanguage" value={this.state.chooseLanguage} onChange={this.handleChange}>
                        <option value="English">English</option>
                        <option value="Norwegian">Norwegian</option>
                    </select>
                    <select name="chooseDifficulty" value={this.state.chooseDifficulty} onChange={this.handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>>
                </form>
                <button onClick={this.onClick}>Get New Word</button>
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