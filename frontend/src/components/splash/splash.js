import React from "react";
import SessionFormContainer from '../session/session_form_container';
import SplashInfo from './splash_info';
import "../../stylesheets/splash.css";

class Splash extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mount: false
    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        mount: true
      })
    }, 100)  
  }
  render() {
    return (
      <div className="splash">
        <div className="header">
          <h1 className={`title ${this.state.mount? "fade-in":""}`}>The Tellurian</h1>
          <h2 className={`byline ${this.state.mount? "fade-in":""}`}>
            All the news you need on the world. On the world.
          </h2>
        </div>

        <div className="splash-center">
          <SplashInfo />
          <div className="session-container">
            <img
              className="logo"
              alt="tellurian_logo"
              src={require("../../images/alien_w.png")}
            />
            <SessionFormContainer />
            <div className="credits">
              Icons made by
              <a
                href="https://www.flaticon.com/authors/icongeek26"
                title="Icongeek26"
              >
                {" "}
                Icongeek26{" "}
              </a>{" "}
              {' and '}
              <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                Freepik
              </a>
              <br/>
              {' and '}
              <a
                href="https://www.flaticon.com/authors/roundicons"
                title="Roundicons"
              >
                Roundicons
              </a>
              {' from '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
