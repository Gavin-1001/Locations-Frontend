import {useState} from "react";
import {useSelector} from "react-redux";
import Locations from "../../common/models/Locations";
import {Navigate, useNavigate} from "react-router-dom";
import LocationService from "../../Service/LocationService.service";
import './Location.css';
import axios from "axios";


const Location = () => {
    const API_KEY = 'AIzaSyAguiylf_Y_iBBPafpUxiRWbtsdq8kDh6c';
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state) => state.user);
    const [location, setLocation] = useState(new Locations("", "", "", "", ""))
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [newStartCity, setNewStartCity] = useState(''); // 'Milan'
    const [newEndCity, setNewEndCity] = useState(''); // Milan
    const [startCoords, setStartCoords] = useState()
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [formData, setFormData] = useState({
        newStartCity: '',
        startCountry: '',
        startCityLat: '',
        startCityLong: '',
        newEndCity: '',
        endCityLat: '',
        endCityLong: '',
        endCountry: '',
        dateTravelled: '',
        //latLong: {latitude, longitude}

    });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    //console.log(formData.startCity.valueOf());

    const handleLocationChange = (event) => {
        setNewStartCity(event.target.value);
        //setNewEndCity(event.target.value);
        formData.newStartCity = event.target.value;
        // formData.newEndCity = event.target.value;
        //console.log(formData.newStartCity);
    };

    const handleLocationChangeEndCity = (event) => {
        setNewEndCity(event.target.value);
        formData.newEndCity = event.target.value;
    }

    const getEndCityLatLong = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    newEndCity
                )}&key=${API_KEY}`
            );
            if (response.data.results.length > 0) {
                const {lat, lng} = response.data.results[0].geometry.location;
                console.log(newEndCity+ " before hand")
                // setNewStartCity(newStartCity)
                setNewEndCity(newEndCity);
                console.log(newEndCity)
                // setStartCoords({lat, lng});
                console.log("lat long " + lat, lng)
                // setLatitude(lat);
                // setLongitude(lng)
                formData.endCityLat = lat;
                formData.endCityLong = lng;
                console.log()

            } else {
                setLatitude('');
                setLongitude('');
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    }


    const getStartCityLatLong = async () => {

        try {
            // const startCity = formData.newStartCity
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    newStartCity
                )}&key=${API_KEY}`
            );

            if (response.data.results.length > 0) {
                const {lat, lng} = response.data.results[0].geometry.location;
                console.log(newStartCity)
                setNewStartCity(newStartCity)
                setStartCoords({lat, lng});
                console.log("lat long " + lat, lng)
                setLatitude(lat);
                setLongitude(lng)

                formData.startCityLat = lat;
                formData.startCityLong = lng;

            } else {
                setLatitude('');
                setLongitude('');
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // if (!currentUser.id) {
        //     return <Navigate to={{pathname: '/login'}}/>;
        // }
        // if (
        //     !location.startCity ||
        //     !location.startCountry ||
        //     !location.endCity ||
        //     !location.endCountry ||
        //     !location.dateTravelled
        // ) {
        LocationService.getLatLong(formData).then((_) => {
            console.log(formData);
        })
            .catch((err) => {
                setErrorMessage("There was an unexpected error")
                console.log(err);
            });


        LocationService.postLocation(formData).then((_) => {
            console.log(formData);
            navigate('/dashboard');
        })
            .catch((err) => {
                setErrorMessage("There was an unexpected error")
                console.log(err);
            });
        console.log(JSON.stringify(formData))
        //}
        setFormData({
            newStartCity: '',
            startCountry: '',
            startLatitude: '',
            startLongitude: '',
            newEndCity: '',
            endCountry: '',
            endCoords: '',
            dateTravelled: ''
        });
        console.log("THIS IS" + newStartCity)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className={"form-container"}>
                <div className={"input-container"}>
                    <label htmlFor="newStartCity" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter start city"
                           value={newStartCity}
                           name={"newStartCity"}
                           required
                        //onChange={handleChange}
                           onChange={handleLocationChange}
                           className="location-form-input"
                    />
                    <button type="button" onClick={getStartCityLatLong} className="btn btn-primary ">Get Lat/Long
                    </button>
                    <div className="invalid-feedback">{location.newStartCity} cannot be empty</div>
                </div>

                <input type={"text"}
                       value={formData.startCityLat}
                       className="location-form-input"
                       readOnly/>

                <input type={"text"}
                       value={longitude}
                       className="location-form-input"
                       readOnly/>

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

                <div className={"input-container"}>
                    <label htmlFor="endCity" className="location-form-label"/>
                    <input type="text"
                           placeholder="enter end city"
                           value={newEndCity}
                           name={"endCity"}
                           required
                           //onChange={handleChange}
                           onChange={handleLocationChangeEndCity}
                           className="location-form-input"
                    />
                    <button type="button" onClick={getEndCityLatLong} className="btn btn-primary button-input-field">Get Lat/Long</button>
                    <div className="invalid-feedback">{location.newEndCity} cannot be empty</div>
                </div>

                <input type={"text"}
                       value={formData.endCityLat}
                       className="location-form-input"
                       readOnly/>

                <input type={"text"}
                       value={formData.endCityLong}
                       className="location-form-input"
                       readOnly/>

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
                    <input type="calender"
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