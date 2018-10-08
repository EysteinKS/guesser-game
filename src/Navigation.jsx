import React, { Component} from "react";

class Navigation extends Component {
    render(){
        return(
            <header>
                <h1>Navigation</h1>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Create</li>
                    <li>Join</li>
                    <li>Play</li>
                </ul>
            </header>
        )
    }
}

export default Navigation;