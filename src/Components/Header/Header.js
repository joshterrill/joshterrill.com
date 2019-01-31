import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { RainbowOrOffline } from '../RainbowOrOffline/RainbowOrOffline';
import './Header.css';

export class Header extends Component {
  constructor(props) {
    super();
    this.state = props;
  }
  componentWillReceiveProps(props) {
    this.setState(props);
  }
  render() {
    return (
      <div className="flex">
        <Link className="header-link" to="/">
          <h1>joshterrill<RainbowOrOffline online={this.state.online} />com</h1>
        </Link>
        <h2>(sofware engineer)</h2>
      </div>
    );
  }
}