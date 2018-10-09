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
            currentWord: 1,
            loadedWord: false
        }
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange)
    }

    onClick = () => {
        if (this.state.loadedWord == false){
            this.setState({ loadedWord: !this.state.loadedWord})
        }
        firestore.getWordByDifficultyAndLanguage("English", "Easy", `Word${this.state.currentWord}`);
        firestore.getLenghtOfDifficulty("English", "Easy");
        if (this.state.currentWord < Store["DifficultyLength"]){
            this.setState({
                currentWord: this.state.currentWord + 1
            })
        } else {
            this.setState({
                currentWord: 1
            })
        }
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
                    <li>{Store["currentWord"]}</li>
                    <li>{Store["currentType"]}</li>
                    <li>{Store["currentCategory"]}</li>
                </ul>
            </section>
        )
    }
}

export default Home;