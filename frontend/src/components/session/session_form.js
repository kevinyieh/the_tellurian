import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/session_form.css'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      formType: "login",
    };
   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((key, i) => (
          <li key={`error-${i}`}>{this.props.errors[key]}</li>
        ))}
      </ul>
    );
  }

  componentDidUpdate() {
    if (Object.keys(this.props.currentUser).length !== 0) {
      this.props.clearErrors();
      this.props.history.push("/main");
    }
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.state.formType === "signup") {
      user = {
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      };
      this.props.signup(user)
    } else {
      user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.login(user)
    }
  }

  handleDemo(e) {
    e.preventDefault();
    let user;
    user = {
      email: "demo@demo.demo",
      password: "demodemodemo",
    };
    this.props.login(user)
  }

  login() {
    return (
      <div>
        <label htmlFor="email">Email address</label>
        <input
          className="session-input"
          id="email"
          type="email"
          required
          value={this.state.email}
          onChange={this.update("email")}
          placeholder="Email"
        />

        <br></br>
        <label htmlFor="password">Password</label>
        <input
          className="session-input"
          id="password"
          type="password"
          value={this.state.password}
          onChange={this.update("password")}
          placeholder="Password"
        />
      </div>
    );
  }

  signup() {
    return (
      <div className="session-form">
        {this.login()}
        <br></br>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          className="session-input"
          id="confirm"
          type="password"
          value={this.state.password2}
          onChange={this.update("password2")}
          placeholder="Confirm Password"
        />
      </div>
    );
  }

  switchForm() {
    this.props.clearErrors();
    const formType = this.state.formType === "login" ? "signup" : "login";
    this.setState({
      email: "",
      password: "",
      password2: "",
      formType,
    });
  }

  altButton() {
    return (
      <button onClick={this.switchForm}>
        {this.state.formType === "login" ? "Sign Up Instead" : "Back to Login" }
      </button>
    )
  }

  render() {
    return (
      <div className="session-form">
        <form onSubmit={this.handleSubmit}>
          {this.state.formType === "login" ? this.login() : this.signup()}
          {this.renderErrors()}
          <button>{this.state.formType === "login" ? "Log In" : "Sign Up"}</button>
        </form>
        {this.altButton()}
        <button id="demo" onClick={this.handleDemo}>
          Log In As Demo User
        </button>
        {this.props.demo}
      </div>
    );
  }
}

export default withRouter(SessionForm);