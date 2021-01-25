import axios from 'axios';


//HEROKU
// const api = axios.create({
//     baseURL: ''
// })

// LOCAL
// const api = axios.create({
//     baseURL: '' || 'http://localhost:3000/api'
// })


const production  = '/api';
const development = 'http://localhost:3000/api';
const url = (process.env.NODE_ENV ? production : development);


const api = axios.create({
    baseURL: url
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
export const getProductsByStore = id => api.get(`/store/${id}/products`)
export const uploadStoreImage = payload => api.post(`/store/upload-image`, payload)

export const deleteStoreImage = (id, payload) => api.put(`/store/${id}/delete-image/`, payload)


////////////////    PRODUCT    /////////////////////////
export const addProduct = payload => api.post(`/product`, payload)
export const uploadProductImage = payload => api.post(`/product/upload-image`, payload)
export const deleteProductImage = (id, payload) => api.put(`/product/${id}/delete-image/`, payload)

export const updateProduct = (id, payload) => api.put(`/product/${id}`, payload)


export const deleteProductById = id => api.delete(`/product/${id}`)
export const getAllProducts = () => api.get(`/products`)
export const getProductById = id => api.get(`/product/${id}`)





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
    getProductsByStore,
    addProduct,
    uploadProductImage,
    deleteProductImage,
    deleteProductById,
    updateProduct,
    /// STORE ///
    getStoreById,
    uploadStoreImage,
    deleteStoreImage
}

export default apis