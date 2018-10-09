import React, { Component } from "react";

class WordListContainer extends Component {

    render(){
        const wordArray = [
            wordObject,
            wordObjectTwo
        ]

        const wordObject = {
            word: "Dog",
            type: "Noun",
            category: "Animal",
            difficulty: "Easy"
        }

        const wordObjectTwo = {
            word: "Tree",
            type: "Noun",
            category: "Plant",
            difficulty: "Easy"
        }

        let wordArrayFirst = wordArray[0]

        let wordList = () =>
            <ul>
                <p>List</p>
                <li>{wordArrayFirst.word}</li>
                <li>{wordArrayFirst.type}</li>
                <li>{wordArrayFirst.category}</li>
                <li>{wordArrayFirst.difficulty}</li>
            </ul>

        return(
            <div>
                <p>The word is:</p>
                {wordList}
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