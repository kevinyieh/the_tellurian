import React from 'react';
import {Link} from 'react-router-dom';

const SplashInfo = (props) => {
    return (
        <div className="splash-info">
            <h3>Welcome to the Tellurian!</h3>  
            <p>We are an aggregate global news app with a little spin. You might be wondering what in the world is a tellurian. Let us save you a second:</p>
            <div className="definition">
                <p>Tel·lu·ri·an</p>
                <p className="pronunciation">/təˈlo͝orēən/</p>
                <p className="noun">noun</p>
                <p>    1.  an inhabitant of the earth.</p>
            </div>
            <p>You are a tellurian, as are we. And we want to know what’s happening on our planet, and where. Here, you will catch up on today’s news anywhere in world, and get all the relevant  context you need on that location. The world is your oyster.</p>
            <div className="team">
                <Link to="/team">Team Tellurian</Link>
            </div>
            <div className="quote">“No matter what people tell you, words and ideas can change the world.” - Robin Williams</div>
            {props.children}
        </div>
    )
}

export default SplashInfo;