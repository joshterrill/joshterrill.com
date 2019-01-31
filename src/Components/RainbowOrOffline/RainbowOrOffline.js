import React, { Component } from 'react';
import './RainbowOrOffline.css';

export class RainbowOrOffline extends Component {
  constructor(props) {
    super();
    this.state = props;
  }
  componentWillReceiveProps(props) {
    this.setState(props);
  }
  render() {
    return (
      <span>
        <span className={this.state.online ? 'rainbow' : 'hide'}>.</span>
        <img className={this.state.online ? 'hide' : 'offline-icon'} src="images/offline.png" />
      </span>
    );
  }
}