import React, {Component} from "react";
import MembersContainer from "../components/MembersContainer";
import TimerContainer from "../components/TimerContainer";
import WordListContainer from "../components/WordListContainer";

class Play extends Component {
    render(){
        return(
            <section>
                <h1>Play</h1>
                <TimerContainer/>
                <MembersContainer/>
                <WordListContainer/>
            </section>
        )
    }
}

export default Play;