import React, { Component } from "react"
import { SessionStore, UserStore } from "../store/Store"
import moment from "moment"

class SessionContainer extends Component {
    constructor(props){        
        super(props)
        SessionStore.addListener(this.onChange)
        UserStore.addListener(this.onChange)
    }

    componentWillUnmount() {
        SessionStore.removeListener(this.onChange)
        UserStore.removeListener(this.onChange)
    }
    onChange = () => {
        this.forceUpdate()
    }

    render(){
      
        

        return(
            <section>
                <p>Session started: {SessionStore["SessionStartTime"]} </p>
                <p>{SessionStore["activePlayers"]} players</p>
                
                
            </section>
        )
    }

}

export default SessionContainer