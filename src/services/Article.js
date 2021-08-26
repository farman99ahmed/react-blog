import axios from "axios";
import { JWTHeader } from "../config/Headers";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const CreateNewArticle = async (title, content, token) => {
    try {
        const config = {
            method: 'post',
            url: `${backendURL}/article`,
            headers: JWTHeader(token),
            data: {
                title,
                body: content,
            }
        }
        const response = await axios(config);
        return ({
            message: response.data.message,
            id: response.data.id
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

const UpdateArticle = async (_id, title, body, token) => {
    try {
        const config = {
            method: 'put',
            url: `${backendURL}/updatearticle`,
            headers: JWTHeader(token),
            data: {
                _id,
                title,
                body
            }
        }
        const response = await axios(config);
        return ({
            message: response.data.message,
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

const GetAllArticles = async (token, isMyArticle = false) => {
    try {
        const config = {
            method: 'get',
            url: isMyArticle ? `${backendURL}/myarticles` : `${backendURL}/articles`,
            headers: JWTHeader(token),
        }
        const response = await axios(config);
        return (response.data.articles);
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

const DeleteArticle = async (token, _id) => {
    try {
        const config = {
            method: 'delete',
            url: `${backendURL}/article`,
            headers: JWTHeader(token),
            data: {
                _id
            }
        }
        await axios(config);
        return ({
            message: "User deleted successfully"
        });
    } catch (error) {
        return ({
            error: error.response.data.error
        })
    }
}

export {
    CreateNewArticle, UpdateArticle, GetAllArticles, DeleteArticle
}