import React, { Component } from "react";

const wordObject = {
    word: "Dog",
    type: "Noun",
    category: "Animal",
    difficulty: "Easy"
}

class wordListContainer extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
                <p>{wordObject.word}</p>
                <p>{wordObject.type}</p>
                <p>{wordObject.category}</p>
                <p>{wordObject.difficulty}</p>
            </div>
        )
    }
}