import React, {Component} from "react";
import { firestore } from "../firebase/index"
import { Store, UserStore } from "../store/Store"
import "../css/CreateWordContainer.css"

class CreateWordContainer extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onChange)
        UserStore.addListener(this.onChange)
        this.state = {
            newDifficulty: "Easy",
            newLanguage: "English",
            newWord: "",
            newType: "Noun",
            newCategory: "Plant"
        }
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange)
        UserStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

    newWord = (event) => {
        if (UserStore["Permission"] == "Admin"){
            firestore.setNewWordInDictionary(
                this.state.newLanguage, 
                this.state.newDifficulty, 
                this.state.newWord, 
                this.state.newType, 
                this.state.newCategory)
        } else {
            Store.set({["createWordCondition"]: "Error: Only admin users can add new words"})
        }
        
        event.preventDefault();
    }

    render(){

        return(
            <section>
                <h3>Create New Word</h3>
                <form onSubmit={this.newWord}>
                    <select className="difficultySelect" name="newDifficulty" value={this.state.newDifficulty} onChange={this.handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <select className="languageSelect" name="newLanguage" value={this.state.newLanguage} onChange={this.handleChange}>
                        <option value="English">English</option>
                        <option value="Norwegian">Norwegian</option>
                    </select>
                    <input className="wordInput"
                        name="newWord"
                        type="text"
                        value={this.state.newWord}
                        onChange={this.handleChange}
                        placeholder="New Word">
                    </input>
                    <select className="typeSelect" name="newType" value={this.state.newType} onChange={this.handleChange}>
                        <option value="Noun">Noun</option>
                        <option value="Verb">Verb</option>
                        <option value="Adjective">Adjective</option>
                    </select>
                    <select className="categorySelect" name="newCategory" value={this.state.newCategory} onChange={this.handleChange}>
                        <option value="Plant">Plant</option>
                        <option value="Animal">Animal</option>
                        <option value="Mineral">Mineral</option>
                        <option value="Abstract">Abstract</option>
                    </select>
                    <input className="submitButton" type="submit" value="Submit"></input>
                </form>
                <h3>{Store["createWordCondition"]}</h3>
            </section>
        )
    }
}

export default CreateWordContainer;