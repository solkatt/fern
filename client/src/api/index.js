import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

////////////////    USER    /////////////////////////
export const registerUser = payload => api.post('/user', payload)
export const loginUser = payload => api.post('auth', payload)


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    registerUser,
    loginUser
}

export default apis