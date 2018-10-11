import React, { Component } from "react";
import { firestore } from "../firebase"
import { Store } from "../store/Store"
import random from "lodash.random"

class WordListContainer extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onChange)
        this.state = {
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

    randomWord = () => {
        let currentWord = Store["wordDoc"]
        console.log(currentWord + " is currentWord")
        let newWord = random(1, Store[`${this.state.chooseDifficulty}Length`])
        console.log(newWord + " is newWord")
        if (newWord == currentWord) {
            console.log("newWord equals currentWord, creating new word")
            newWord = this.randomWord()
        } else {
            console.log(newWord + " is being returned as newWord")
            Store.set({ ["wordDoc"]: newWord})
            firestore.getWordByDifficultyAndLanguage(this.state.chooseLanguage, this.state.chooseDifficulty, `Word${Store["wordDoc"]}`);
        }

    }

    onClick = () => {
        console.log("Button Clicked")
        if (this.state.loadedWord == false) {
            this.setState({ loadedWord: !this.state.loadedWord})
        }
        console.log("Setting newWord")
        this.randomWord()
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

    render(){

        return(
            <section>
                <h3>Word Generator</h3>
                <form>
                    <select name="chooseLanguage" value={this.state.chooseLanguage} onChange={this.handleChange}>
                        <option value="English">English</option>
                        <option value="Norwegian">Norwegian</option>
                    </select>
                    <select name="chooseDifficulty" value={this.state.chooseDifficulty} onChange={this.handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
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

export default WordListContainer;