import React from 'react';
import "../../stylesheets/team.css";

class Team extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
 
  }
  render() {
    return (
      <div className="splash">
          <div className="team-page">

            <h1 className="team-title"> TEAM TELLURIAN </h1>

            {/* <img> ZOOM PIC</img> */}

            <div className="flex-team">
                <div>
                <div className="teammate">
                    <h2>Kevin Yieh</h2>
                    <h3>Team Lead</h3>
                    <div className="personal-links">
                        <a href="https://github.com/kevinyieh?tab=repositories"><img
                        className="personal-link-logo"
                        alt="github"
                        src={require("./connect/github_logo.png")}
                        /></a>
                        <a href="www.linkedin.com/in/kevin-yieh"><img
                        className="personal-link-logo"
                        alt="linkedin"
                        src={require("./connect/linkedin_logo.png")}
                        /></a>
                        <img
                        className="personal-link-logo"
                        alt="angelist"
                        src={require("./connect/angelist_logo.png")}
                        />
                    </div>
                </div>

                <div className="teammate">
                    <h2>Wilson Li</h2>
                    <h3>Backend Lead</h3>
                    <div className="personal-links">
                        <a href="https://github.com/ligokdoon"><img
                        className="personal-link-logo"
                        alt="github"
                        src={require("./connect/github_logo.png")}
                        /></a>
                        <a href="https://www.linkedin.com/in/wilsonli117/"><img
                        className="personal-link-logo"
                        alt="linkedin"
                        src={require("./connect/linkedin_logo.png")}
                        /></a>
                        <img
                        className="personal-link-logo"
                        alt="angelist"
                        src={require("./connect/angelist_logo.png")}
                        />
                    </div>
                </div>
                </div>

                <div>
                <div className="teammate">
                    <h2>Becca Burten</h2>
                    <h3>Frontend Lead</h3>
                    <div className="personal-links">
                        <a href="https://github.com/beccaburten/"><img
                        className="personal-link-logo"
                        alt="github"
                        src={require("./connect/github_logo.png")}
                        /></a>
                        <a href="https://www.linkedin.com/in/beccaburten/"><img
                        className="personal-link-logo"
                        alt="linkedin"
                        src={require("./connect/linkedin_logo.png")}
                        /></a>
                        <a href="https://angel.co/u/becca-burten"><img
                        className="personal-link-logo"
                        alt="angelist"
                        src={require("./connect/angelist_logo.png")}
                        /></a>
                    </div>
                </div>

                <div className="teammate">
                    <h2>Donald Herndon</h2>
                    <h3>Flex</h3>
                    <div className="personal-links">
                        <a href="https://github.com/herndal"><img
                        className="personal-link-logo"
                        alt="github"
                        src={require("./connect/github_logo.png")}
                        /></a>
                        <a href="https://www.linkedin.com/in/donald-herndon-8364b01a5/"><img
                        className="personal-link-logo"
                        alt="linkedin"
                        src={require("./connect/linkedin_logo.png")}
                        /></a>
                        <img
                        className="personal-link-logo"
                        alt="angelist"
                        src={require("./connect/angelist_logo.png")}
                        />
                    </div>
                </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
