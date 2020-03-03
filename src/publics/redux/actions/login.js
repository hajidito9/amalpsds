import axios from 'axios';
import linkApi from './linkApi';

export const toLogin = (username, password) => {
    return {
        type: 'POST_LOGIN',
        payload : axios.post(linkApi.ip+'login', {
            username : username,
            password : password,
        })
    }
}