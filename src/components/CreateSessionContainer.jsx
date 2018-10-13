import React, { Component } from "react"
import { session } from "../firebase/index"

class CreateSessionContainer extends Component {
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

export default CreateSessionContainer;