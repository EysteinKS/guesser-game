import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './css/App.css';

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import PasswordForget from "./components/PasswordForget";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import * as routes from "./constants/routes";
import withAuthentication from "./withAuthentication";


//TODO
//CREATE FIREBASE DB AND CONNECT TO API
//CREATE CONTAINERS IN COMPONENTS
//CREATE COMPONENTS FOR REUSABLE PARTS


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation/>
          <Route className="full-height" exact path={routes.HOME} component={() => <Home />} />
          <Route className="full-height" exact path={routes.CREATE} component={() => <Create />} />
          <Route className="full-height" exact path={routes.JOIN} component={() => <Join />} />
          <Route className="full-height" exact path={routes.PLAY} component={() => <Play />} />
          <Route className="full-height" exact path={routes.PROFILE} component={() => <Profile />} />
          <Route className="full-height" exact path={routes.PW_FORGET} component={() => <PasswordForget/>} />
          <Route className="full-height" exact path={routes.SIGN_UP} component={() => <SignUp />} />
          <Route className="full-height" exact path={routes.SIGN_IN} component={() => <SignIn />} />        
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);