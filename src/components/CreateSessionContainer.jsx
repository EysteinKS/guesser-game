import React, { Component } from "react"
import { session } from "../firebase/index"
import { UserStore } from "../store/Store"

class CreateSessionContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            sessionKey: ""
        }

    }

    componentDidMount() {

    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })


    doCreateSession = () => {
        session.createSession()
    }

    doJoinSession = ( event ) => {
        session.joinSession( this.state.sessionKey )
        event.preventDefault();
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