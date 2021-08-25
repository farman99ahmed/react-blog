import axios from "axios";
import { AuthHeader, JWTHeader } from "../config/Headers";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const Register = async (fullname, email, mobile, password) => {
    try {
        const config = {
            method: 'post',
            url: `${backendURL}/register`,
            headers: AuthHeader(),
            data: {
                fullname,
                email,
                mobile,
                password
            }
        }
        const response = await axios(config);
        return ({
            success: response.message
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const Login = async (email, password) => {
    try {
        let config = {
            method: 'post',
            url: `${backendURL}/login`,
            headers: AuthHeader(),
            data: {
                email,
                password
            }
        }
        let token = await axios(config);
        token = token.data.token;
        config = {
            method: 'get',
            url: `${backendURL}/self`,
            headers: JWTHeader(token)
        }
        let response = await axios(config)
        return ({
            id: response.data.id,
            name: response.data.fullname,
            email: response.data.email,
            mobile: response.data.mobile,
            token: token
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

const Logout = async () => {
    try {
        localStorage.clear();
        return true
    } catch (error) {
        return false
    }
}

export { Login, Register, Logout }