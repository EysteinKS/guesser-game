import React, { Component } from "react"
import { session } from "../firebase/index"
import { SessionStore } from "../store/Store"

class LobbyContainer extends Component {
    constructor(props){
        super(props)
        SessionStore.addListener(this.onChange)
    }

    componentWillUnmount() {
        SessionStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    startSession = () =>
        session.startSession()

    leaveSession = () => 
        session.leaveSession()

    render(){
        return(
            <section>
                <h1>Session Lobby</h1>
                <h3>Share the key {SessionStore["SessionKey"]} to invite players</h3>
                <p>Current active players is {SessionStore["activePlayers"]}</p>
                <ul>
                    <li>Player 1 = ...</li>
                    <li>Player 2 = ...</li>
                </ul>
                <button onClick={this.leaveSession}>Close Lobby</button>
                <button>Ready</button>
                <button onClick={this.startSession}>Start Session</button>
            </section>
        )
    }
}

export default LobbyContainer;