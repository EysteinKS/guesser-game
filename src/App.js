import React, { Component } from 'react';
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
      <div className="App">
        <Navigation/>
      </div>
    );
  }
}

export default App;