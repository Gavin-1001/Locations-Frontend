import React, { useEffect } from 'react'
import { useState } from 'react'
import AuthUser from '../../common/models/AuthUser';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthService from "../../Service/AuthService.service";
import './register.page.css'



const Register = () => {
    const [user, setUser] = useState(new AuthUser("", ""));
    const [loading, setLoading] = useState(false); //sets a loading state to let the user know the page is loading
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checked, setChecked] = useState(false);

    const currentUser = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.id) {
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((previousState) => {
            return {
                ...previousState,
                [name]: value,
            };
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        //stops the register creds being displayed in url

        setSubmitted(true);
        if (!user.username || !user.password) {
            return; //checks if username and password fields are not empty
        }
        setLoading(true);
        //console.log(user);
        //Authentication next

        AuthService.register(user)
            .then((_) => {
                //set user in session
                navigate("/signin");
            })
            .catch((error) => {
                console.log(error);
                // Todo:v
                //add custom user error pages later. Check if error is 409 => username password not valid. setsErrorMsg to something like username not found
                //don't expose the users creds by allowing
                if (error?.response?.status === 409) {
                    // 409
                    setErrorMessage("username or password is not valid, user already exists with this username"); //remove the "user already exists with this username" for testing only
                } else {
                    setErrorMessage("Unexpected error. Try again.");
                }
                setLoading(false);
            });
    };

    return (
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
                <h3>Sign up</h3>{" "}
                {/*NoT really happy with this but style later if you get a chance*/}
                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form
                    onSubmit={(e) => handleRegister(e)}
                    className={submitted ? "was-validated" : ""}
                    noValidate // does not validate the form
                >
                    <div className="form-group">
                        {/*USERNAME*/}
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Enter your username here"
                            autoComplete="none"
                            value={user.username}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
                        <div className="invalid-feedback">USERNAME IS REQUIRED!!</div>
                    </div>

                    <div className="form-group">
                        {/*PASSWORD*/}
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password here"
                            value={user.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
                        <div className="invalid-feedback">PASSWORD IS REQUIRED!!</div>
                    </div>


                    {/*FIRST NAME*/}
                    <div className="form-group">
                        {/*PASSWORD*/}
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter your first name"
                            value={user.firstName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
                        <div className="invalid-feedback">First Name IS REQUIRED!!</div>
                    </div>


                    {/*LAST NAME*/}
                    <div className="form-group">
                        {/*PASSWORD*/}
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter your last name"
                            value={user.lastName}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
                        <div className="invalid-feedback">Last Name IS REQUIRED!!</div>
                    </div>

                    <div className="form-group">
                        {/*PASSWORD*/}
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            type="email"
                            name="emailAddress"
                            className="form-control"
                            placeholder="Enter your Email Address"
                            value={user.emailAddress}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
                        <div className="invalid-feedback">Email Address IS REQUIRED!!</div>
                    </div>


                    {/*<div className="form-group">
                        /*PASSWORD*
                        <input
                            type="checkbox"
                            name="checkbox"
                            value={user.isJobSeeker}
                            onChange={handleChecked}

                        />
                        /*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*
                        <div className="invalid-feedback">PASSWORD IS REQUIRED!!</div>
                    </div>
                        */}

                    {/*Add the button*/}
                    <button className="btn btn-primary w-100 mt-3">Sign up</button>
                </form>
                <Link
                    to="/signin"
                    className="btn btn-link"
                    style={{ color: "darkgray" }}
                >
                    I have an Account
                </Link>
            </div>
        </div>

    );
};
//} think this goes here. EDIT: nvm
export default Register;
