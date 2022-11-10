import React from "react";
import './Header.css';

const Header = ({black}) => {
    return(
        <header className={black ? 'blackHeader': ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://logospng.org/download/netflix/logo-netflix-512.png"/>
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"/>
                </a>
            </div>
        </header>
    )
}

export default Header;