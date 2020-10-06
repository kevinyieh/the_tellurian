import React from "react";
import { withRouter } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isSignup: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.openSignup = this.openSignup.bind(this);
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
    this.setState({
      isSignup: true,
      password2: ""
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if (this.state.isSignup) {
      user = {
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      this.props.signup(user, this.props.history);
    } else {
      user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.login(user);
    }
  }

  login() {
    return (
      <div>
        <input
          type="text"
          value={this.state.email}
          onChange={this.update("email")}
          placeholder="Email"
          />
        <input
          type="password"
          value={this.state.password}
          onChange={this.update("password")}
          placeholder="Password"
          />
      </div>
    )
  }

  signup() {
    return (
      <div>
        {this.login()}
        <input
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
      return (
        <button onClick={this.openSignup}>
          Sign up
        </button>
      )
    }
  }

  render() {
    return (
      <div className="session-form">
        <form onSubmit={this.handleSubmit}>
          {this.state.isSignup ? this.signup() : this.login()}
          <input type="submit" value={this.state.isSignup ? "Sign up" : "Log in"} />
          {this.renderErrors()}
        </form>
        {this.signupButton()}
        {this.props.demo}
      </div>
    );
  }
}

export default withRouter(SessionForm);