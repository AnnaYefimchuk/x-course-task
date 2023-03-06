import React from 'react';
import error404 from './images/404.png';

function Error404() {
    return (
        <main className="main">
            <div className="errorContent">
                <div className="error404Png">
                    <img src={error404} alt="Oops, something went wrong. 404 error..." />
                </div>
            </div>
            </main>
    );
}

export default Error404;