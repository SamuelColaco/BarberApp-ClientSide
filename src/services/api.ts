
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.request.use((env) => {
    const token = localStorage.getItem('@refund:token')

    if(token){
        env.headers.Authorization = `Bearer ${token}`
    }
    return env
}, (error) => {
    return Promise.reject(error)
})

export default api