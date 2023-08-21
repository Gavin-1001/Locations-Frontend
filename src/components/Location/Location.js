import {useState} from "react";
import {useSelector} from "react-redux";
import Locations from "../../common/models/Locations";
import {Navigate, useNavigate} from "react-router-dom";
import LocationService from "../../Service/LocationService.service";
import './Location.css';


const Location = () => {

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state) => state.user);
    const [location, setLocation] = useState(new Locations("", "", "", "", ""))
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        startCity: '',
        startCountry: '',
        endCity: '',
        endCountry: '',
        dateTravelled: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!currentUser.id) {
            return <Navigate to={{pathname: '/login'}}/>;
        }
        if (
            !location.startCity ||
            !location.startCountry ||
            !location.endCity ||
            !location.endCountry ||
            !location.dateTravelled
        ) {
            LocationService.postLocation(formData).then((_) => {
                console.log(formData);
                navigate('/dashboard');
            })
                .catch((err) => {
                    setErrorMessage("There was an unexpected error")
                    console.log(err);
                });
            console.log(JSON.stringify(formData))
        }
        setFormData({
            startCity: '',
            startCountry: '',
            endCity: '',
            endCountry: '',
            dateTravelled: ''
        });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={"form-container"}>
                <div>
                    <label htmlFor="startCity" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter start city"
                           value={formData.startCity}
                           name={"startCity"}
                           required
                           onChange={handleChange}
                           className="location-form-input"
                    />
                    <div className="invalid-feedback">{location.startCity} cannot be empty</div>

                </div>

                <div>
                    <label htmlFor="startCountry" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter start country"
                           value={formData.startCountry}
                           name={"startCountry"}
                           required
                           onChange={handleChange}
                           className="location-form-input"
                    />
                    <div className="invalid-feedback">{location.startCountry} cannot be empty</div>
                </div>

                <div>
                    <label htmlFor="endCity" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter end city"
                           value={formData.endCity}
                           name={"endCity"}
                           required
                           onChange={handleChange}
                           className="location-form-input"
                    />
                    <div className="invalid-feedback">{location.endCity} cannot be empty</div>
                </div>

                <div>
                    <label htmlFor="endCountry" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter end country"
                           value={formData.endCountry}
                           name={"endCountry"}
                           required
                           onChange={handleChange}
                           className="location-form-input"
                    />
                    <div className="invalid-feedback">{location.endCountry} cannot be empty</div>
                </div>

                <div>
                    <label htmlFor="dateTravelled" className="location-form-label"/>
                    <input type="date"
                           value={formData.dateTravelled}
                           name={"dateTravelled"}
                           required
                           onChange={handleChange}
                           className="location-form-input"
                    />
                    <div className="invalid-feedback">{location.dateTravelled} cannot be empty</div>
                </div>
                <button type="submit" className="location-form-submit">
                    Submit
                </button>
            </form>
        </div>
    );
}


export default Location;