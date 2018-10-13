import React, {Component} from "react";
import {  Link } from "react-router-dom";
import * as routes from "../constants/routes";
import AuthUserContext from "../AuthUserContext";
import SignOutButton from "../components/SignOut";
import DropdownMenu from "./DropdownMenu";
import "../css/Navigation.css"

class Navigation extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <header>
            
                <Link to={routes.HOME}><img className="logoHeader" src="https://i.imgur.com/rzlWtcU.png"></img></Link>
                <AuthUserContext.Consumer>
                { authUser => authUser 
                ? <DropdownMenu listitems={NavigationAuth()} />
                : <DropdownMenu listitems={NavigationNonAuth()} />
                }
                </AuthUserContext.Consumer>
            </header>
        )
    }
}


const NavigationAuth = () =>
<div className="navDrop">
<ul className="headerList">      
      <div> <li className="headerLink"><Link className="headerLinkText" to={routes.PROFILE}>Profile</Link></li></div>
      <div> <li className="headerLink"><Link className="headerLinkText" to={routes.CREATE}>Create</Link></li></div>
      <div> <li className="headerLink"><Link className="headerLinkText" to={routes.PLAY}>Play</Link></li></div>
      <div> <li className="headerLink_signOutButton"><SignOutButton /></li></div>
    </ul>
</div>
const NavigationNonAuth = () =>
    <ul className="headerList">
        <li><Link className="headerLink" to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Navigation;