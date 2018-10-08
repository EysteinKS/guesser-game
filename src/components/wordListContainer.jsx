import React, { Component } from "react";

class wordListContainer extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        const wordObject = {
            word: "Dog",
            type: "Noun",
            category: "Animal",
            difficulty: "Easy"
        }

        return(
            
            <div>
                <p>The word is: {wordObject.word}</p>
                <p>The type is: {wordObject.type}</p>
                <p>The category is: {wordObject.category}</p>
                <p>The difficulty is: {wordObject.difficulty}</p>
            </div>
        )
    }
}

export default wordListContainer;