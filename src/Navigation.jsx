import React from "react";
import {  Link } from "react-router-dom";
import * as routes from "./constants/routes";


const Navigation = () =>
    <header>
        <Link to={routes.HOME}><p>Guesser Game</p></Link>
        <AuthNavigation/>
    </header>

const AuthNavigation = () =>
    <ul>
        <li><Link className="link" to={routes.PROFILE}>Profile</Link></li>
        <li><Link className="link" to={routes.CREATE}>Create</Link></li>
        <li><Link className="link" to={routes.JOIN}>Join</Link></li>
        <li><Link className="link" to={routes.PLAY}>Play</Link></li>
    </ul>

export default Navigation;