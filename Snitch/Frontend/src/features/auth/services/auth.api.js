import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const register = async ({ email, contact, password, fullname, role }) => {
    const response = await api.post("api/auth/register", {
        email,
        contact,
        password,
        fullname,
        role
    })
    return response.data;
}