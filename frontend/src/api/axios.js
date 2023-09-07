import axios from 'axios';

export default axios.create({
    // TODO: make it configurable through .env
    baseURL: 'http://192.168.0.111:3000/api'
});