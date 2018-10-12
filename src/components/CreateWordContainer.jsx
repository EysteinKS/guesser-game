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
        firestore.setNewWordInDictionary(this.state.newLanguage, 
                                        this.state.newDifficulty, 
                                        this.state.newWord, 
                                        this.state.newType, 
                                        this.state.newCategory)
        event.preventDefault();
    }

    render(){

        let admin = false;
        if (UserStore["Permission"] == "Admin"){
            admin = true;
        }

        return(
            <div>
                {admin
                ? <CreateWord newWord={this.newWord} 
                    newDiff={this.state.newDifficulty}
                    newLang={this.state.newLanguage}
                    newType={this.state.newType}
                    newCat={this.state.newCategory}
                    handleCha={this.handleChange}
                />
                : null}
            </div>
        )
    }
}

const CreateWord = (newWord, newDiff, newLang, newType, newCat, handleCha) => 
    <section>
        <h2>Create New Word</h2>
        <form onSubmit={newWord}>
            <select name="newDifficulty" value={newDiff} onChange={handleCha}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            <select name="newLanguage" value={newLang} onChange={handleCha}>
                <option value="English">English</option>
                <option value="Norwegian">Norwegian</option>
            </select>
            <input
                name="newWord"
                type="text"
                value={newWord}
                onChange={handleCha}
                placeholder="New Word">
            </input>
            <select name="newType" value={newType} onChange={handleCha}>
                <option value="Noun">Noun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
            </select>
            <select name="newCategory" value={newCat} onChange={handleCha}>
                <option value="Plant">Plant</option>
                <option value="Animal">Animal</option>
                <option value="Mineral">Mineral</option>
                <option value="Abstract">Abstract</option>
            </select>
            <input className="submit" type="submit" value="Submit"></input>
        </form>
        <h3>{Store["createWordCondition"]}</h3>
    </section>

export default CreateWordContainer;