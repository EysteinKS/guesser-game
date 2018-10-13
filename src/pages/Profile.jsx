import React, { Component } from "react";
import { UserStore, SessionStore } from "../store/Store"

class Profile extends Component {
    constructor(props){
        super(props)
        UserStore.addListener(this.onChange)
        this.state = {
            dataLoaded: false
        }
    }

    componentWillUnmount() {
        UserStore.removeListener(this.onChange)
    }

    onChange = () => {
        this.forceUpdate()
    }

    render(){
        return(
            <section>
                {UserStore["userDataLoaded"] == "true"
                ? <ProfileAuth/>
                : <ProfileNonAuth/>
                }
            </section>
        )
    }

}

const ProfileAuth = () => 
    <section>
        <p>Current user is {UserStore["Username"]}</p>
        <p>User permission level is {UserStore["Permission"]}</p>
    </section>

const ProfileNonAuth = () =>
    <p>Loading user data...</p>

export default Profile;