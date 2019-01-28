import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <div className="flex">
            <h1>joshterrill.com</h1>
            <h2>(sofware engineer)</h2>
          </div>
          <ul className="links">
            <li><a href="https://github.com/joshterrill" target="_blank">Github</a></li>
            <li><a href="https://redshift.ai" target="_blank">Redshift AI</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
