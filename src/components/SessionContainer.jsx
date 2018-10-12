import React, { Component } from "react"
import { SessionStore, UserStore } from "../store/Store"
import { session } from "../firebase/index"

class SessionContainer extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <section>
                <CreateSession/>
            </section>
        )
    }

}

class CreateSession extends Component {
    constructor(props){
        super(props)
    }

    doCreateSession = () => {
        session.createSession()
    }

    render(){
        return(
            <section>
                <button onClick={this.doCreateSession}>Create Session</button>
            </section>
        )
    }

}

class SessionLobby extends Component {

}

export default SessionContainer