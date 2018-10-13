import React, {Component} from "react";
import MembersContainer from "../components/MembersContainer";
import TimerContainer from "../components/TimerContainer";
import WordListContainer from "../components/WordListContainer";
import SessionContainer from "../components/SessionContainer";
import CreateSessionContainer from "../components/CreateSessionContainer";
import LobbyContainer from "../components/LobbyContainer"
import { UserStore, SessionStore } from "../store/Store"
import { session } from "../firebase/index"

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
        console.log("hasActiveSession =", UserStore["hasActiveSession"])
        console.log("isInLobby =", UserStore["isInLobby"])

        if (UserStore["isInLobby"] == "true") {
            if (UserStore["hasActiveSession"] == "true"){
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
            <LobbyContainer/>
        )
    }


}

class ActiveSession extends Component {
    leaveSession = () =>
        session.leaveSession()

    render(){
        return(
            <div>
                <h1>Active Session</h1>
                <SessionContainer/>
                <TimerContainer/>
                <MembersContainer/>
                <WordListContainer/>
                <button onClick={this.leaveSession}>Leave Session</button>
            </div>
        )
    }
}

export default Play;