import React from 'react';
import './footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footerBar">
                <span>
                    Виконано в
                    <a href="https://prometheus.org.ua/" target="_blank"> Prometheus </a>
                    © 2022
                </span>
            </div>
        </div>
    );
}

export default Footer;