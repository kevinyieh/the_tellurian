import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState(
      {
        show: false,
      },
      () => {
        document.removeEventListener("click", this.close);
      }
    );
  }

  show() {
    this.setState({
      show: true
    }, () => {
      document.addEventListener('click', this.close);
    })
  }

  render() {
    if (this.props.loggedIn)
    return (
      <div className="session-drop">
        <button
          className={`hamburger hamburger--emphatic ${
            this.state.show ? "is-active" : ""
          }`}
          type="button"
          onClick={this.show}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        {this.state.show ? (
          <div className="session-drop-menu">
            <button className="logout-button" onClick={this.props.logout}>
              Eject!<i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mDTP)(Dropdown)