import {BASE_API_URL} from "../api/BaseUrl";
import axios from "axios";

const BASE_URL = BASE_API_URL + "/api/locations/";

class LocationService{

    postLocation(locations){
        return axios.post(BASE_URL + 'create', locations);
    }

    updateLocation(location){}

}

export default new LocationService();