import React, { Component } from "react"
import { session } from "../firebase/index"
import { SessionStore } from "../store/Store"

class LobbyContainer extends Component {
    constructor(props){
        super(props)
    }

    startSession = () =>
        session.startSession()

    closeLobby = () => 
        session.closeLobby()

    render(){
        return(
            <section>
                <h1>Session Lobby</h1>
                <h3>Share the key {SessionStore["SessionKey"]} to invite players</h3>
                <ul>
                    <li>Player 1 = ...</li>
                    <li>Player 2 = ...</li>
                </ul>
                <button onClick={this.closeLobby}>Close Lobby</button>
                <button>Ready</button>
                <button onClick={this.startSession}>Start Session</button>
            </section>
        )
    }
}

export default LobbyContainer;