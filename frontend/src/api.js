import axios from 'axios';

// Dynamically determine the API URL based on the current hostname
// This assumes the backend is always running on port 8000 of the same host
const api = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:8000/api`,
});

export default api;
