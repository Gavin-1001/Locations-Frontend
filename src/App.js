import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/Register/register.page";
import {AuthGuard} from "./AuthGuard/AuthGuard";
import Logout from "./pages/Logout/Logout";
import Location from "./components/Location/Location";



function App() {
    const linksForNavbar = [
        {url: '/signup', text: 'Register'},
        {url: '/signin', text: 'Signin'},
    ];

    return (
        <BrowserRouter>

            {/*<Navbar/> real navbar here*/}

            <div>
                {/*<TestNavbar links={links} />*/}
                <Navbar links={linksForNavbar}/>

            </div>

            {/*<Navbar title="NavBar" content=""*/}

            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/signup" element={<Register/>}/>


                    <Route
                        path="/dashboard"
                        element={
                            <AuthGuard>
                                <Dashboard/>
                            </AuthGuard>
                        }
                    />

                    <Route
                        path="/location"
                        element={
                            <AuthGuard>
                                <Location />
                            </AuthGuard>
                        }
                    />

                    <Route
                        path="/home"
                        element={
                            <AuthGuard>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />




                    {/*<Route path="/jobListings" element={<AuthGuard><JobListings/></AuthGuard>}/>*/}
                    {/*<Route path="/jobsAdvertisement" element={<AuthGuard><JobAdvertisement/></AuthGuard>}/>*/}
                    <Route path="/logout" element={<Logout/>}/>
                    {/*<Route path="/about" element={<About/>}/>*/}
                    {/*<Route path="/profile" element={<Profile/>}/>*/}
                    {/*<Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />*/}
                    {/*<Route path="*" element={<NotFound/>}/>*/}
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )

}

export default App;


