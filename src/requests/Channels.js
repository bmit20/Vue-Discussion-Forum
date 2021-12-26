import Axios from "../axios";

export let channelsListRequest = () => {
    return Axios.get(`channel/all`)
};