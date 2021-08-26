import axios from "axios";
import { AuthHeader, JWTHeader } from "../config/Headers";
import FirebaseInstance from '../config/FirebaseConfig';
import "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

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
            picture: response.data.profile_picture,
            token: token
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

const ChangePassword = async (token, old_password, new_password) => {
    try {
        const config = {
            method: 'put',
            url: `${backendURL}/changepassword`,
            headers: JWTHeader(token),
            data: {
                old_password,
                new_password
            }
        }
        const response = await axios(config);
        return ({
            success: response.data.message
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        });
    }
}

const UpdateProfilePicture = async (token, image) => {
    try {
        const uploadTask = await FirebaseInstance().storage().ref('mern').child('profile/' + uuidv4()).put(image);
        const downloadURL = await uploadTask.ref.getDownloadURL();
        const config = {
            method: 'put',
            url: `${backendURL}/updateprofilepictureurl`,
            headers: JWTHeader(token),
            data: {
                profile_picture: downloadURL
            }
        }
        const response = await axios(config);
        return ({
            success: response.data.message,
            picture: downloadURL
        });

    } catch (error) {
        return ({
            error: error.message
        })
    }

}


export { Login, Register, ChangePassword, UpdateProfilePicture }