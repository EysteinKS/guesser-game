import React, {Component} from "react";
import MembersContainer from "../components/membersContainer";
import TimerContainer from "../components/timerContainer";
import WordListContainer from "../components/wordListContainer";

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