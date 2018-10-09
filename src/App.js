import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';

import Navigation from "./Navigation";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Play from "./pages/Play";
import Profile from "./pages/Profile";

import * as routes from "./constants/routes";


//TODO
//CREATE ROUTES TO OTHER PAGES WITH REACT ROUTER
//CREATE src/constants and add routes.js
//CREATE FIREBASE DB AND CONNECT TO API
//CREATE CONTAINERS IN COMPONENTS
//CREATE COMPONENTS FOR REUSABLE PARTS
//CREATE WORD LIST COMPONENT


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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;