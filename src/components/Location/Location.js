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
    const [startCoords, setStartCoords] = useState()
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [formData, setFormData] = useState({
        newStartCity: '',
        startCountry: '',
        latitude: '',
        longitude: '',
        endCity: '',
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
    };


    const getLatLong = async () => {

        try {
            // const startCity = formData.newStartCity
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    newStartCity
                )}&key=${API_KEY}`
            );

            if (response.data.results.length > 0) {
                const {lat, lng} = response.data.results[0].geometry.location;
                console.log({lat, lng})
                setStartCoords({lat, lng});
                console.log("lat long" + lat, lng)
                setLatitude(lat);
                setLongitude(lng)

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
        console.log("1")
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
            endCity: '',
            endCountry: '',
            endCoords: '',
            dateTravelled: ''
        });
    }
    return (
        <div className="container">
            {/*<div>*/}
            {/*    <h2>Get Latitude and Longitude</h2>*/}
            {/*    <div>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Enter a location"*/}
            {/*            value={startCity}*/}
            {/*            onChange={handleLocationChange}*/}
            {/*        />*/}
            {/*        <button onClick={getLatLong}>Get LatLong</button>*/}
            {/*    </div>*/}
            {/*    {latitude && longitude && (*/}
            {/*        <div>*/}
            {/*            Latitude: {latitude}*/}
            {/*            <br />*/}
            {/*            Longitude: {longitude}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            <form onSubmit={handleSubmit} className={"form-container"}>
                <div>
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
                    <div className="invalid-feedback">{location.newStartCity} cannot be empty</div>
                </div>
                <button type="button" onClick={getLatLong} className="btn btn-primary ">Get Lat/Long</button>
                <input type={"text"}
                       value={latitude}
                       className="location-form-input"
                       readOnly/>

                <input type={"text"}
                       value={longitude}
                       className="location-form-input"
                       readOnly/>

                <div>

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