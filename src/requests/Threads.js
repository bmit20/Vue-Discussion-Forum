import Axios from "../axios";

export let threadsListRequest = (page) => {
    return Axios.get(`threads?page=${page}`)
};

export let getSingleThreadRequest = (slug) => {
    return Axios.get(`threads/${slug}`)
};

export let submitNewReplyForThreadRequest = (formData) => {
    return Axios.post(`threads/answers`, formData)
};

export let createNewThreadRequest = (formData) => {
    return Axios.post(`threads`, formData)
};

export let deleteThreadRequest = (id) => {
    return Axios.delete(`threads/${id}`)
};