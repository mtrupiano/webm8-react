import axios from 'axios';

const url = 'http://localhost:3001';

export default {
    authenticate: (token) => {
        return axios.get(`${url}/authenticate`, {
            headers: {
                "x-access-token": token
            }
        });
    },
    signin: (data) => {
        return axios.post(`${url}/signin`, data);
    },
    getEntitiesInCollection: (collectionId, token) => {
        return axios.get(`${url}/api/collection/?collection=${collectionId}`, {
            headers: { 'x-access-token': token }
        });
    },
    editCollectionColor: (collectionId, newColor, token) => {
        const data = {
            id: collectionId,
            color: newColor
        }
        return axios.put(`${url}/api/collection/recolor`, data, {
            headers: { 'x-access-token': token }
        });
    }
}