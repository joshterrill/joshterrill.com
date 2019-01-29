import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from './Home/Home'
import { Contact } from './Contact/Contact'
import { Header } from './Components/Header/Header'
import { Navigation } from './Components/Navigation/Navigation'
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div>
            <Header />
            <Navigation />
            <Route path="/" exact component={Home} />
            <Route path="/contact/" component={Contact} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
