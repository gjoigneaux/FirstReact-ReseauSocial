import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const postmessage = (data) => {
    return axios.post(API_URL + "postmessage", data, { headers: authHeader() }); //
};

const postmessagewithimage = (data, image) => {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('idUSERS', data.idUSERS)
    fd.append('username', data.username)
    fd.append('message', data.message)
    console.log(fd);
    return axios.post(API_URL + "postmessagewithimage", fd, { headers: authHeader(), 'Content-Type': 'multipart/form-data' }); //
};

const postCommentaire = (data) => {
    return axios.post(API_URL + "postcommentaire", data, { headers: authHeader() }); //
};

const deletePost = (id, multimedia) => {
    if (multimedia !== null) {
        const multi = multimedia.split('/images/')[1]
        return axios.delete(API_URL + `deletePost/${id}`, {data : {'multi': multi},  headers: authHeader() }); //
    } else {
        const multi = multimedia
        return axios.delete(API_URL + `deletePost/${id}`, {data : {'multi': multi},  headers: authHeader() }); //
    }
};

const updatePost = (data) => {
    return axios.put(API_URL + "updatepost", data, { headers: authHeader() }); //
};

const getallmessages = () => {
    return axios.get(API_URL + "getallmessages", { headers: authHeader() }); //
};

const getallmessagesoneuser = (id) => {
    return axios.get(API_URL + `getallmessagesoneuser/${id}`, { headers: authHeader() }); //
};

const getcommentaires = (id) => {
    return axios.get(API_URL + `getcommentaires/${id}`, { headers: authHeader() }); //
};

const deleteuser = (id) => {
    return axios.delete(API_URL + `deleteUser/${id}`, { headers: authHeader() }); //
}

export default {
    postmessage,
    postmessagewithimage,
    postCommentaire,
    deletePost,
    updatePost,
    getallmessages,
    getallmessagesoneuser,
    getcommentaires,
    deleteuser,
};