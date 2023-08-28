import {BASE_API_URL} from "../api/BaseUrl";
import axios from "axios";

const BASE_URL = BASE_API_URL + "/api/locations/";
const API_KEY = `AIzaSyAguiylf_Y_iBBPafpUxiRWbtsdq8kDh6c`

class LocationService{

    postLocation(locations){
        return axios.post(BASE_URL + 'create', locations);
    }

    updateLocation(locations){
        return axios.put(BASE_URL+'update', locations);
    }

    getAllLocations(){
        return axios.get(BASE_URL+'getAll');
    }

    getLatLong(newStartCity){
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newStartCity}&key=${API_KEY}`);
    }

}

export default new LocationService();