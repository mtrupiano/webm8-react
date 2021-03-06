import axios from 'axios';

const url = 'http://localhost:3001';

export default {

    // User functions
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
    signup: (data) => {
        return axios.post(`${url}/register`, data);
    },

    // Collection functions
    getEntitiesInCollection: (collectionId, token) => {
        return axios.get(`${url}/api/collection/?collection=${collectionId}`, {
            headers: { 'x-access-token': token }
        });
    },
    createCollection: (data, token) => {
        return axios.post(`${url}/api/collection`, data, {
            headers: { 'x-access-token': token }
        })
    },
    renameCollection: (collectionId, newName, token) => {
        return axios.put(`${url}/api/collection/rename`, {
            id: collectionId,
            name: newName
        }, {
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
    },
    getCollectionInfo: (collectionId, token) => {
        return axios.get(`${url}/api/collection?collection=${collectionId}`, {
            headers: { 'x-access-token': token }
        })
    },
    getSelectedCollection: (token) => {
        return axios.get(`${url}/selectedCollection`, {
            headers: { 'x-access-token': token }
        })
    },
    updateSelectedCollection: (collectionId, token) => {
        return axios.put(`${url}/selectedCollection/${collectionId}`, null, {
            headers: { 'x-access-token': token }
        })
    },
    getPath: (collectionId, token) => {
        console.log('GET: ' + `${url}/api/collection/path?collection=${collectionId}`)
        return axios.get(`${url}/api/collection/path?collection=${collectionId}`, {
            headers: { 'x-access-token': token }
        })
    },

    // Bookmark functions
    createBookmark: (data, token) => {
        return axios.post(`${url}/api/bookmarks`, data, {
            headers: { 'x-access-token': token }
        });
    },
    renameBookmark: (bookmarkId, newName, token) => {
        return axios.put(`${url}/api/bookmarks/rename`, {
            id: bookmarkId,
            name: newName
        }, {
            headers: { 'x-access-token': token }
        })
    },
    editBookmarkColor: (bookmarkId, newColor, token) => {
        return axios.put(`${url}/api/bookmarks/recolor`, {
            id: bookmarkId,
            color: newColor
        }, {
            headers: { 'x-access-token': token }
        });
    }
}