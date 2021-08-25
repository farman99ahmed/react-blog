import axios from "axios";
import { JWTHeader } from "../config/Headers";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const AllUsers = async (token) => {
    try {
        const config = {
            method: 'get',
            url: `${backendURL}/users`,
            headers: JWTHeader(token)
        }
        const response = await axios(config);
        return (response.data.users);
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

export {
    AllUsers
}