import React, {Component} from "react";
import { firestore } from "../firebase/index"
import { Store } from "../store/Store"

class Create extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onChange)
        this.state = {
            newDifficulty: "Easy",
            newLanguage: "English",
            newWord: "",
            newType: "",
            newCategory: ""
        }
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

    newWord = (event) => {
        firestore.setNewWordInDictionary(this.state.newLanguage, 
                                        this.state.newDifficulty, 
                                        this.state.newWord, 
                                        this.state.newType, 
                                        this.state.newCategory)
        event.preventDefault();
    }

    render(){
        return(
            <section>
                <h1>Create</h1>
                <form onSubmit={this.newWord}>
                    <select name="newDifficulty" value={this.state.newDifficulty} onChange={this.handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <select name="newLanguage" value={this.state.newLanguage} onChange={this.handleChange}>
                        <option value="English">English</option>
                        <option value="Norwegian">Norwegian</option>
                    </select>
                    <input
                        name="newWord"
                        type="text"
                        value={this.state.newWord}
                        onChange={this.handleChange}
                        placeholder="New Word">
                    </input>
                    <input
                        name="newType"
                        type="text"
                        value={this.state.newType}
                        onChange={this.handleChange}
                        placeholder="Word Type">
                    </input>
                    <input
                        name="newCategory"
                        type="text"
                        value={this.state.newCategory}
                        onChange={this.handleChange}
                        placeholder="Word Category">
                    </input>
                    <input type="submit" value="Submit"></input>
                </form>
                <h3>{Store["createWordCondition"]}</h3>
            </section>
        )
    }
}

export default Create;