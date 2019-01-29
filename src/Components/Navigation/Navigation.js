import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';

export class Navigation extends Component {
  render() {
    return (
      <ul className="links">
        <li><Link to="/">Home</Link></li>
        <li><a href="https://github.com/joshterrill" target="_blank">Github</a></li>
        <li><a href="https://redshift.ai" target="_blank">Redshift AI</a></li>
        <li><Link to="/contact/">Contact</Link></li>
      </ul>
    );
  }
}