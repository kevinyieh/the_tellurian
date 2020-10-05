import React from 'react';

class Splash extends React.Component {

    render() {
        return (

            <div>
                <h1 className="logo">The Tellurian</h1>
                <img alt="tellurianLogo" src={require('../../images/alien.png')} />
                <h2>Find all the news you need on the world, on the world.</h2>

                <button>Enter Here</button>

                <div className="credits">
                    Icons made by < a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26" > Icongeek26</a > from < a href="https://www.flaticon.com/" title="Flaticon" > www.flaticon.com</a>
                    Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                </div>
            </div>
        )
    }
}

export default Splash;

