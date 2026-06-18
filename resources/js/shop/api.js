import axios from 'axios'

const api = axios.create({
    baseURL: '/api/shop',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

api.interceptors.request.use(async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
    }

    return config
})

export default api
