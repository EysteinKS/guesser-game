import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from "./Navigation";
import Home from "./pages/Home";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Home/>
      </div>
    );
  }
}

export default App;
