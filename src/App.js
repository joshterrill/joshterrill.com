import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from './Home/Home'
import { Contact } from './Contact/Contact'
import { Header } from './Components/Header/Header'
import { Thankyou } from './Thankyou/Thankyou';
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
            <Route path="/contact" exact component={Contact} />
            <Route path="/contact/thankyou/" exact component={Thankyou} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
