import React, { Component } from "react";

class WordListContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            wordArray: [
                {
                    word: "Dog",
                    type: "Noun",
                    category: "Animal",
                    difficulty: "Easy"
                },
                {
                    word: "Tree",
                    type: "Noun",
                    category: "Plant",
                    difficulty: "Easy"                    
                }
            ]
        }
    }
    render(){
        
        return(
            <div>
                <p>The word is:</p>
                <ul>
                    <li>{this.state.wordArray[0].word}</li>
                    <li>{this.state.wordArray[0].type}</li>
                    <li>{this.state.wordArray[0].category}</li>
                    <li>{this.state.wordArray[0].difficulty}</li>
                </ul>
            </div>
        )
    }
}

export default WordListContainer;

/*
TODO:
-Choose Type, Category and/or Difficulty before starting timer
-Display Word, Type, Category and Difficulty in container
-Skip word
*/