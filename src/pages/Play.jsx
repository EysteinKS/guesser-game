import React, {Component} from "react";
import MembersContainer from "../components/MembersContainer";
import TimerContainer from "../components/TimerContainer";
import WordListContainer from "../components/WordListContainer";
import SessionContainer from "../components/SessionContainer";
import CreateSessionContainer from "../components/CreateSessionContainer";
import { UserStore, SessionStore } from "../store/Store"

class Play extends Component {
    constructor(props){
        super(props)
        UserStore.addListener(this.onChange)
    }

    componentWillMount(){
        SessionStore.set({ ["SessionState"]: "Inactive" })
    }

    componentWillUnmount() {
        UserStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    render(){

        let sessionState;
        console.log(SessionStore["SessionState"])
        console.log("hasActiveSession =", UserStore["hasActiveSession"])
        console.log("isInLobby =", UserStore["isInLobby"])

        if (UserStore["isInLobby"]) {
            if (UserStore["hasActiveSession"]){
                sessionState = <ActiveSession/>
            } else {
                sessionState = <SessionLobby/>
            }
        } else {
            sessionState = <JoinSession/>
        }

        return(
            <section>
                <h1>Play</h1>
                {sessionState}
            </section>
        )
    }
}

class JoinSession extends Component {
    render(){
        return(
            <div>
                <h1>Join a session</h1>
                <h3>Or create session</h3>
                <CreateSessionContainer/>
            </div>
        )
    }
}

class SessionLobby extends Component {
    render(){
        return(
            <div>
                <h1>Session Lobby</h1>
                <ul>
                    <li>Player 1 = ...</li>
                    <li>Player 2 = ...</li>
                </ul>
                <button>Ready</button>
            </div>
        )
    }


}

class ActiveSession extends Component {
    render(){
        return(
            <div>
                <h1>Active Session</h1>
                <SessionContainer/>
                <TimerContainer/>
                <MembersContainer/>
                <WordListContainer/>
            </div>
        )
    }
}

export default Play;