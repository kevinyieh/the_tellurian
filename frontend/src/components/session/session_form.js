import React from "react";
import { withRouter } from "react-router-dom";
import '../../stylesheets/session_form.css'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isSignup: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.openSignup = this.openSignup.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/main");
    }
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  openSignup() {
    this.props.clearErrors();
    this.setState({
      isSignup: true,
      password2: "",
      errors: {},
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.state.isSignup) {
      user = {
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      };
      this.props.signup(user).then(this.props.history.push("/main"));
    } else {
      user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.login(user).then(this.props.history.push("/main"));
    }
  }

  handleDemo(e) {
    e.preventDefault();
    let user;
      user = {
        email: "demo@demo.demo",
        password: "demodemodemo",
      };
      this.props.login(user).then(this.props.history.push("/main"));
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

  signupButton() {
    if (!this.state.isSignup) {
      return <button onClick={this.openSignup}>Sign Up Instead</button>;
    }
  }

  render() {
    return (
      <div className="session-form">
        <form onSubmit={this.handleSubmit}>
          {this.state.isSignup ? this.signup() : this.login()}
          {this.renderErrors()}
          <button>{this.state.isSignup ? "Sign Up" : "Log In"}</button>
        </form>
        <button id="demo" onClick={this.handleDemo}>Log In As Demo User</button>
        {/* {this.props.demo} */}
        {this.signupButton()}
      </div>
    );
  }
}

export default withRouter(SessionForm);