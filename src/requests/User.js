import Axios from "./../axios";

export let getLeaderboardsRequest = (page) => {
    return Axios.get(`users/leaderboards?page=${page}`)
};