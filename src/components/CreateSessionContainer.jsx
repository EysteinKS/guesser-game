import React, { Component } from "react"
import { session } from "../firebase/index"
import { SessionStore } from "../store/Store"

class CreateSessionContainer extends Component {
    constructor(props){
        super(props)
        SessionStore.addListener(this.onChange)
        this.state = {
            sessionKey: ""
        }

    }

    componentWillUnmount() {
        SessionStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
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
           <div className="createJoinSessionGrid">
           <section>
           <div className="createSession">
                <button className="createSessionButton" onClick={this.doCreateSession}>Create Session</button></div>
               
                <div className="joinSession">
                <form onSubmit={this.doJoinSession} autocomplete="off">
                <h1>Join a session</h1>
                <p>{SessionStore["SessionJoinState"]}</p>
                
                    <input className="sessionKeyInput" 
                        name="sessionKey"
                        type="text"
                        value={this.state.sessionKey}
                        onChange={this.handleChange}
                        placeholder="CODE">
                    </input>
                    <div className="joinSessionButton"><input className="createSessionButton" type="submit" value="Join"></input></div>
                    
                    
                </form>
                </div>
            </section>
            </div>   )
    }
}

export default CreateSessionContainer;