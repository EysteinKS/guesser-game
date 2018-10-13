import React, { Component } from "react"
import { session } from "../firebase/index"

class LobbyContainer extends Component {
    constructor(props){
        super(props)
    }

    startSession = () =>
        session.startSession()

    render(){
        return(
            <section>
                <h1>Session Lobby</h1>
                <ul>
                    <li>Player 1 = ...</li>
                    <li>Player 2 = ...</li>
                </ul>
                <button>Ready</button>
                <button onClick={this.startSession}>Start Session</button>
            </section>
        )
    }
}

export default LobbyContainer;