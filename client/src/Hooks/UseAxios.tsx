import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
});
