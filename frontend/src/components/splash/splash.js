import React from "react";
import "../../stylesheets/splash.css";

class Splash extends React.Component {
  render() {
    return (
      <div className="splash">
        <div className="header">
          <h1 className="title">The Tellurian</h1>
          <h2 className="byline">
            All the news you need on the world. On the world.
          </h2>
        </div>

        <div className="session-form">
          <img
            className="logo"
            alt="tellurian_logo"
            src={require("../../images/alien_w.png")}
          />
          <h3>SESSION COMPONENT FORM IMPORTED HERE</h3>
          <div className="credits">
            Icons made by
            <a
              href="https://www.flaticon.com/authors/icongeek26"
              title="Icongeek26"
            >
              {" "}
              Icongeek26{" "}
            </a>{" "}
            and
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
