/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Navbar.css'

import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentUser} from "../../redux/store/actions/users";

const Navbar = ({links}) => {

    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/signin");
    };
    return (
        <nav className="navbar">
            <ul className="list">
                {links.map((link, index) => (
                    <li key={index} className="listItem">
                        <NavLink to={link.url} className="link">
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>


            {currentUser &&
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        {/*  {currentUser.username} todo->This causes an error when you logout, {currentUser is NULL} */}
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><NavLink to="/profile" className="dropdown-item">Profile</NavLink></li>
                        <li><NavLink to="/location" className="dropdown-item">Trips</NavLink></li>
                        <li><NavLink to="/home" className="dropdown-item">Home</NavLink></li>
                        <li><NavLink to="/map" className="dropdown-item">Map</NavLink></li>
                        <li><NavLink to="/logout" className="dropdown-item" onClick={() => logout()}>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            }

        </nav>
    );
};


export default Navbar;
