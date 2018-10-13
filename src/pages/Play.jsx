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

    doSetDate = () => {
        session.getTimeStamp()
    }

    render(){

        let sessionState;

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
                <button onClick={this.doSetDate}>Set Date</button>
            </section>
        )
    }
}

class JoinSession extends Component {
    render(){
        return(
            <div>
                
                
                <h1>Create session</h1>
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
            <div className="activeSessionGrid">
                <div className="activeSessionGridPeace"><h1>Active Session</h1></div>
                <div className="activeSessionGridPeace"> <TimerContainer/></div>
                <div className="activeSessionGridPeace"> <MembersContainer/></div>
                <div className="activeSessionGridPeace"> <WordListContainer/></div>
                <button className="createSessionButton" onClick={this.leaveSession}>Leave Session</button>
                <div className="activeSessionGridPeace"> <SessionContainer/></div>
            </div>
        )
    }
}

export default Play;