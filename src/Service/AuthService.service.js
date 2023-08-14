import {BASE_API_URL} from "../api/BaseUrl";
import axios from "axios";

const BASE_URL = BASE_API_URL + "/api/auth";

class AuthService{

    login(user){
        return axios.post(BASE_URL + '/signin', user);
    }

    register(user){
        return axios.post(BASE_URL + '/register', user);
    }

}

export default new AuthService();