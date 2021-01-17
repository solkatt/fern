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
export const getCurrentUser = payload => api.get('/me', payload)


////////////////    STORE   /////////////////////////
export const getStoreById = id => api.get(`/store/${id}`)


////////////////    PRODUCT    /////////////////////////
export const addProduct = payload => api.post(`/product`, payload)
export const uploadProductImage = payload => api.post(`/product/uploadImage`, payload)
export const deleteProductById = id => api.delete(`/product/${id}`)
export const getAllProducts = () => api.get(`/products`)
export const getProductById = id => api.get(`/product/${id}`)

export const updateProduct = (id, payload) => api.put(`/product/${id}`, payload)




////////////////    CUSTOMER    /////////////////////////






const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    /// USER ///
    registerUser,
    loginUser,
    getCurrentUser,
    /// PRODUCTS ///
    ////Should Be getAllProductsByStore and another one all for all products
    getAllProducts,
    getProductById,
    addProduct,
    uploadProductImage,
    deleteProductById,
    updateProduct,
    /// STORE ///
    getStoreById,
}

export default apis