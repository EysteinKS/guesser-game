import React, {Component} from "react";
import WordListContainer from "../components/WordListContainer"

class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){

        return(
            <section>
                <h1>Home</h1>
                <WordListContainer/>
            </section>
        )
    }
}

export default Home;