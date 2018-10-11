import React, {Component} from "react";
import Magnus from "../Magnus"
import WordListContainer from "../components/WordListContainer"

class Home extends Component {
    constructor(props){
        super(props)
    }

    onMagnus = () => {
        console.log("Starting Magnus")
        Magnus()
    }

    render(){

        return(
            <section>
                <h1>Home</h1>
                <button onClick={this.onMagnus}>Magnus</button>
                <WordListContainer/>
            </section>
        )
    }
}

export default Home;