import React, {Component} from "react";
import MembersContainer from "../components/MembersContainer";
import TimerContainer from "../components/TimerContainer";
import WordListContainer from "../components/WordListContainer";
import SessionContainer from "../components/SessionContainer";
import CreateSessionContainer from "../components/CreateSessionContainer";
import LobbyContainer from "../components/LobbyContainer"
import { UserStore, SessionStore } from "../store/Store"
import { session, firestore } from "../firebase/index"

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
            if (UserStore["createdNewLobby"] == "false"){
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
    constructor(props){
        super(props)
        this.state = {
            didMount: false
        }

        this.onUnload = this.onUnload.bind(this);
    }

    onUnload(event) {
        if (this.state.didMount == false){
            console.log("componentDidMount")
            event.returnValue = "Page Loaded"
            alert("addEventListener")
        } else if (this.state.didMount == true) {
            console.log("componentWillUnmount")
            session.leaveSession()
            event.returnValue = "Page Unloaded"
        }
    }
    
    getSessionStartTime = () => {

        let refStringArray = [
            "Sessions",
            "SessionData",
            "LiveSessions",
            SessionStore["sessionID"]
        ]
        //`Sessions/SessionData/LiveSessions/${SessionStore["sessionID"]}`
        console.log("Getting SessionStartTime from", refStringArray)
        firestore.getFirestoreDataToStore(firestore.createFirestoreReference(refStringArray), "lobbyCreated", "SessionStore", "SessionStartTime")
    }

    leaveSession = () =>
        session.leaveSession()

    componentDidMount(){
        window.addEventListener("beforeunload", this.onUnload)
        this.setState({ didMount: true })
    }

    componentWillMount(){
        this.getSessionStartTime()
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.onUnload)
        console.log("ActiveSession did unmount")
    }

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