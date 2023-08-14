
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import {AuthGuard} from "./AuthGuard/AuthGuard";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>

        <div>

        </div>


        <div className="div container">
            <Routes>
                {/*<Route path={"/"} element={<Home />} />*/}
                <Route path={"/signin"} element={<Login />} />



                <Route
                    path="/dashboard"
                    element={
                        <AuthGuard >
                            <Dashboard/>
                        </AuthGuard>
                    }
                />


            </Routes>
        </div>

    </BrowserRouter>
  );
}

export default App;
