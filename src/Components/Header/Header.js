import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div className="flex">
        <Link className="header-link" to="/"><h1>joshterrill<span className="rainbow">.</span>com</h1></Link>
        <h2>(sofware engineer)</h2>
      </div>
    );
  }
}