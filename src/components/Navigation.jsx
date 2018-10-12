import React from "react";
import {  Link } from "react-router-dom";
import * as routes from "../constants/routes";
import AuthUserContext from "../AuthUserContext";
import SignOutButton from "../components/SignOut";
import DropdownMenu from "./DropdownMenu";

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
    <ul>
        <li><Link className="link" to={routes.PROFILE}>Profile</Link></li>
        <li><Link className="link" to={routes.CREATE}>Create</Link></li>
        <li><Link className="link" to={routes.JOIN}>Join</Link></li>
        <li><Link className="link" to={routes.PLAY}>Play</Link></li>
        <li><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () =>
    <ul>
        <li><Link className="link" to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Navigation;