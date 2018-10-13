import React, { Component } from "react"
import { session } from "../firebase/index"

class CreateSessionContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            sessionKey: ""
        }

    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })


    doCreateSession = () => {
        session.createSession()
    }

    doJoinSession = ( sessionkey ) => {
        session.joinSession( sessionkey )
    }

    render(){
        return(
            <section>
                <button onClick={this.doCreateSession}>Create Session</button>
                <form onSubmit={this.doJoinSession}>
                    <input 
                        name="sessionKey"
                        type="text"
                        value={this.state.sessionKey}
                        onChange={this.handleChange}
                        placeholder="Session Key">
                    </input>
                    <input type="submit" value="Join"></input>
                </form>
            </section>
        )
    }
}

export default CreateSessionContainer;