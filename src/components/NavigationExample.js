import React from "react";
import {  Link } from "react-router-dom";
import "./Header.css";
import { firebase } from "./Firebase/"
import * as routes from '../constants/routes';
import AuthUserContext from "./AuthUserContext";
import SignOutButton from "./SignOut";

const Header = () =>
  <div className="">
    <div className="header">
      <Link to={routes.HOME}><p className="display-2 minus-bottom title">Oppgjør</p></Link>
      <AuthUserContext.Consumer>
      { authUser => authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
      }
      </AuthUserContext.Consumer>
    </div>
  </div>

const NavigationAuth = () =>
    <ul className="inline-list">
        <li><Link className="link" to={routes.ACCOUNT}>Account</Link></li>
        <li><Link className="link" to={routes.CALCULATOR}>Calculator</Link></li>
        <li><Link className="link" to={routes.RESULT}>Result</Link></li>            
        <li><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () =>
    <ul className="inline-list">
        <li><Link className="link" to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Header;