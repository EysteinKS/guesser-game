import React from "react";
import { auth } from "../firebase/index"
import * as routes from "../constants/routes"
import { Link } from "react-router-dom"
import "../css/Navigation.css"

const SignOutButton = () =>
    <button className="signOut" type="button"  onClick={auth.doSignOut}>        
        <Link className="headerLink" to={routes.HOME}>Sign Out</Link>
    </button>

export default SignOutButton;