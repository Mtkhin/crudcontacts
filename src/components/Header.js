import React from 'react'
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
    return (
        <div className="header" >
            <Link to="/info">
                <a className="btn  mr-3" id="header-button">
                <i class="fas fa-list"></i> Check the List
                </a>
            </Link>

            <Link to="/add">
                <a className="btn" id="header-button">
                <i class="fas fa-plus-circle"></i> Add Info
                </a>
            </Link>
        </div>
    )
}

export default Header;
