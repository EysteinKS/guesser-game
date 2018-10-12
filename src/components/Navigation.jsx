import React from "react";
import {  Link } from "react-router-dom";
import * as routes from "../constants/routes";
import AuthUserContext from "../AuthUserContext";
import SignOutButton from "../components/SignOut";
import DropdownMenu from "./DropdownMenu";
import "../css/Navigation.css"

const Navigation = () =>
    <header>
        <Link to={routes.HOME}><p>Guesser Game</p></Link>
        <AuthUserContext.Consumer>
        { authUser => authUser 
          ? <DropdownMenu listitems={NavigationAuth()} />
          : <DropdownMenu listitems={NavigationNonAuth()} />
        }
        </AuthUserContext.Consumer>
    </header>

const NavigationAuth = () =>
    <ul className="headerList">
        <li className="headerLink"><Link to={routes.PROFILE}>Profile</Link></li>
        <li className="headerLink"><Link to={routes.CREATE}>Create</Link></li>
        <li className="headerLink"><Link to={routes.JOIN}>Join</Link></li>
        <li className="headerLink"><Link to={routes.PLAY}>Play</Link></li>
        <li className="headerLink"><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () =>
    <ul className="headerList">
        <li><Link className="headerLink" to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Navigation;