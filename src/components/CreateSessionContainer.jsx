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

        if (UserStore["hasActiveSession"] = "false"){
            showRejoin = false
            console.log("showRejoin = false")
        } else {
            showRejoin = true
            console.log("showRejoin = true")
        }

        return(
            <section>
            <div className="createJoinSessionGrid">
            
                <div className="createSession">
                <button className="createSessionButton" onClick={this.doCreateSession}>Create Session</button>
                </div>

                <div className="joinSession">
                
                <form onSubmit={this.doJoinSession} autocomplete="off" >
                    <input className="sessionKeyInput"
                        name="sessionKey"
                        type="text"
                        value={this.state.sessionKey}
                        onChange={this.handleChange}
                        placeholder="Code">
                    </input>
                    <div>
                    <input className="createSessionButton" type="submit" value="Join"></input>
                    </div>
                    </form>
                </div>

                
                <p className="readyToJoinText">{SessionStore["SessionJoinState"]}</p>
                {showRejoin
                ? <div>
                    <button className="createSessionButtonSquere" onClick={this.returnToSession}><p>Click to rejoin {UserStore["SessionKey"]}</p></button>
                </div>
                : null}


                </div>
            </section>
        )
    }
}

const rejoinSession = click => <div><button onClick={click}>Click Here!</button></div>

export default CreateSessionContainer;