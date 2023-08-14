import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import AuthUser from "../../common/models/AuthUser";
import {Link, useNavigate} from "react-router-dom";
import {setCurrentUser} from "../../redux/store/actions/users";
import AuthService from "./../../Service/AuthService.service";

const Login = () => {

    const [user, setUser] = useState(new AuthUser("", ""));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const currentUser = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(currentUser?.id){
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser((prevState) => {
            return{
                ...prevState,
            [name]: value,
            };
        });
    };

    const handleLogin =(e) => {
        e.preventDefault();
        setSubmitted(true);
        if(!user.username || !user.password){
            return;
        }
        setLoading(true);

        AuthService.login(user)
            .then((response) => {
            dispatch(setCurrentUser(response.data));
            navigate("/dashboard")
        }).catch((error) => {
            console.log(error);
            setErrorMessage("USERNAME OR PASSWORD IS NOT VALID");
            setLoading(false);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card ms-auto p-3 shadow-lg custom-card">
                <h4>Sign in</h4>
                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                <form
                    onSubmit={(e) => handleLogin(e)}
                    className={submitted ? "was-validated": ""}
                    noValidate //does not validate the form
                >
                    <div className="form-group">
                        {/*USERNAME*/}
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               name={"username"}
                               className={"form-control"}
                               autoComplete={"off"}
                               placeholder={"Enter your name here"}
                               value={user.username}
                               onChange={(e) => handleChange(e)}
                               required/>

                                {/*DISPLAYS ANY ERROR MESSAGE FOR THE FIELD*/}
                                <div className={"invalid-feedback"}>USERNAME IS REQUIRED</div>
                    </div>

                    <div className="form-group">
                        {/*PASSWORD*/}
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               name={"password"}
                               className={"form-control"}
                               autoComplete={"off"}
                               placeholder={"Enter your password here"}
                               value={user.password}
                               onChange={(e) => handleChange(e)}
                               required/>

                        {/*DISPLAYS ANY ERROR MESSAGE FOR THE FIELD*/}
                        <div className={"invalid-feedback"}>PASSWORD IS REQUIRED</div>
                    </div>

                    <button className={"btn btn-primary w-100 mt-3"}>Sign in</button>
                </form>

                <Link to={"/register"} className={"btn btn-link"} style={{color:"darkgray"}}>Create an account</Link>
            </div>
        </div>
    );
};


export default Login;