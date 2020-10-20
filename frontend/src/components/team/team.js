import React from 'react';

class Team extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
 
  }
  render() {
    return (
      <div className="team">
        <h1> TEAM TELLURIAN </h1>
        {/* <img> ZOOM PIC</img> */}

        <div className="teammate">
            <h2>Kevin Yieh</h2>
            <h3>Team Lead</h3>
        </div>

        <div className="teammate">
            <h2>Wilson Li</h2>
            <h3>Backend Lead</h3>
        </div>

        <div className="teammate">
            <h2>Becca Burten</h2>
            <h3>Frontend Lead</h3>
        </div>

        <div className="teammate">
            <h2>Donald Herndon</h2>
            <h3>Flex</h3>
        </div>
    
      </div>
    );
  }
}

export default Team;
