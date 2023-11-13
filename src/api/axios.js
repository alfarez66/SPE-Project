import axios from "axios";

// get JWT token from session storage
const token = localStorage.getItem('token')
const constan = 'http://10.1.16.169:5000'

export default axios.create({
    // baseURL: 'http://192.168.98.133:5000',
    baseURL: constan,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})