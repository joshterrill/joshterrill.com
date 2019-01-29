import React, { Component } from 'react';
import './Contact.css';

export class Contact extends Component {
  render() {
    return (
      <div className="contact-form-container">
        <h2>Contact</h2>
        <form className="contact-form" action="/contact/thankyou" name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" placeholder="Name" /> <br />
          <input type="email" name="email" placeholder="Email" /> <br />
          <textarea name="message" placeholder="Message"></textarea> <br />
          <div data-netlify-recaptcha="true"></div>
          <button className="submit" type="submit">Send</button>
        </form>
      </div>
    );
  }
}