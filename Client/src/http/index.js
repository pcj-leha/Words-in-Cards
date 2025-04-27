import axios from 'axios'

export const API_URL = `http://62.113.100.190:3005/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.autorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        try {
            if (
                error.response.status === 401 &&
                error.config &&
                !error.config._isRetry
            ) {
                originalRequest._isRetry = true
                const response = await axios.get(`${API_URL}/user/refresh`, {
                    withCredentials: true,
                })
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            }
        } catch (e) {
            console.log('Пользователь не авторизован!')
        }
        throw error
    }
)

export default $api
