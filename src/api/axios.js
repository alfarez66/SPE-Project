import axios from "axios";

// get JWT token from session storage
const token = localStorage.getItem('token')


export default axios.create({
    baseURL: 'http://localhost:5000',
    headers:{
        'Authorization': `Bearer ${token}`
    }
})