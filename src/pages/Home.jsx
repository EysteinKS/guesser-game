import React, {Component} from "react";
import { firestore } from "../firebase/index"

class Home extends Component {

    onClick = () =>
        firestore.getEnglishDictionary()

    render(){
        return(
            <section>
                <h1>Home</h1>
                <button onClick={this.onClick}>Get English Dictionary</button>
            </section>
        )
    }
}

export default Home;