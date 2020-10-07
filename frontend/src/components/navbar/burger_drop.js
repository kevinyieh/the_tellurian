import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="burger-drop">
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
          <div className="burger-drop-menu gradient">
            <button
              className="burger-drop-button logout-button"
              onClick={this.props.logout}
            >
              EJECT<i className="fas fa-sign-out-alt"></i>
            </button>
            <button className="burger-drop-button below profile-button">
              <Link to="/profile">
                <img
                  src="https://cabins-seeds.s3.amazonaws.com/alien_head.png"
                  alt="profile"
                />
              </Link>
            </button>
            <button className="burger-drop-button below git-button">
              <a
                href="https://github.com/kevinyieh/the_tellurian"
                target="_blank"
                rel = "noopener noreferrer"
              >
                <i class="fab fa-github"></i>
              </a>
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