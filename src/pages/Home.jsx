import React, {Component} from "react";
import WordListContainer from "../components/WordListContainer"
import { session } from "../firebase/index"

class Home extends Component {
    constructor(props){
        super(props)
    }

    onClick = () =>
        session.generateKey("3Rj1gu7VbTo6Mx2hazSz")

    render(){

        return(
            <section>
                <h1>Home</h1>
                <WordListContainer/>
                <button onClick={this.onClick}>Generate Key</button>
            </section>
        )
    }
}

export default Home;