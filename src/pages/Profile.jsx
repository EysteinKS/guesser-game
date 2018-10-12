import React, { Component } from "react";
import { Store } from "../store/Store"

class Profile extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onChange)
        this.state = {
            dataLoaded: false
        }
    }

    componentWillUnmount() {
        Store.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    render(){
        return(
            <section>
                {Store["userDataLoaded"] == "true"
                ? <ProfileAuth/>
                : <ProfileNonAuth/>
                }
            </section>
        )
    }

}

const ProfileAuth = () =>
    <p>Current user is {Store["currentUsername"]}</p>


const ProfileNonAuth = () =>
    <p>{Store["userDataLoadingMessage"]}</p>

export default Profile;