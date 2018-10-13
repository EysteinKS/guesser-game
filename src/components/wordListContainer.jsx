import React, { Component } from "react";
import { firestore } from "../firebase"
import { Store } from "../store/Store"
import random from "lodash.random"
import "../css/WordListContainer.css";


class WordListContainer extends Component {
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

    randomWord = () => {
        let currentWord = Store["wordDoc"]
        let newWord = random(1, Store[`${this.state.chooseDifficulty}Length`])
        if (newWord == currentWord) {
            newWord = this.randomWord()
        } else {
            Store.set({ ["wordDoc"]: newWord})
            firestore.getWordByDifficultyAndLanguage(this.state.chooseLanguage, this.state.chooseDifficulty, `Word${Store["wordDoc"]}`);
        }

    }

    onClick = () => {
        if (this.state.loadedWord == false) {
            this.setState({ loadedWord: !this.state.loadedWord})
        }
        this.randomWord()
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

    render(){

        return(
        <div className="mainTable">
            <div className="main">
            <section>
                <div className="wordGenerator">
                <h3 className="wordGeneratorHeader">Word Generator</h3>
                <form>
                    <select className="languageSelecter" name="chooseLanguage" value={this.state.chooseLanguage} onChange={this.handleChange}>
                        <option value="English">English</option>
                        <option value="Norwegian">Norwegian</option>
                    </select>
                    <select className="difficultySelecter" name="chooseDifficulty" value={this.state.chooseDifficulty} onChange={this.handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </form>
                <button className="getWordButton" onClick={this.onClick}>Get New Word</button>
                </div>
                
                <div className="showWord">
                    <ul>
                        <li className="currentWordIs">Current word is:</li>
                        <li className="wordOutPut">{Store["currentWord"]}</li>
                        <li className="wordOutPutType">{Store["currentType"]}</li>
                        <li className="wordOutPutCategory">{Store["currentCategory"]}</li>
                    </ul>
                </div>
                <div className="lastTable">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>

                </div>
        
            </section>
            </div>
        </div>
    )
        
    }
}

export default WordListContainer;