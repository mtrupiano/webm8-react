import axios from 'axios';

const url = 'http://localhost:3001';

export default {
    authenticate: (token) => {
        return axios.post(`${url}/authenticate`, {
            headers: {
                "x-access-token": token
            }
        });
    },
    signin: (data) => {
        return axios.post(`${url}/signin`, data);
    }
}