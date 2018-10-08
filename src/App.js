import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from "./Navigation";
import Home from "./pages/Home";
import WordListContainer from "./components/wordListContainer";
import TimerContainer from "./components/timerContainer";


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
        <WordListContainer/>
      </div>
    );
  }
}

export default App;