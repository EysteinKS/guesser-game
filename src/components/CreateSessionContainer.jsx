import React, { Component } from "react"
import { session } from "../firebase/index"
import { SessionStore, UserStore } from "../store/Store"

class CreateSessionContainer extends Component {
    constructor(props){
        super(props)
        SessionStore.addListener(this.onChange)
        UserStore.addListener(this.onChange)
        this.state = {
            sessionKey: ""
        }

    }

    componentWillUnmount() {
        SessionStore.removeListener(this.onChange)
        UserStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })


    doCreateSession = () => {
        UserStore.set({ ["createdNewLobby"]: "true" })
        session.createSession()
    }

    doJoinSession = ( event ) => {

        session.joinSession( this.state.sessionKey )
        event.preventDefault();
    }

    returnToSession = ( event ) => {
            session.joinSession( UserStore["SessionKey"] )
            event.preventDefault()
    }

    render(){

        let showRejoin

        if (UserStore["hasActiveSession"] = ""){
            showRejoin = false
        } else {
            showRejoin = true
        }

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
                <p>{SessionStore["SessionJoinState"]}</p>
                {showRejoin
                ? <div>
                    <button onClick={this.returnToSession}><p>Click to rejoin {UserStore["SessionKey"]}</p></button>
                </div>
                : null}
                
            </section>
        )
    }
}

const rejoinSession = click => <div><button onClick={click}>Click Here!</button></div>

export default CreateSessionContainer;