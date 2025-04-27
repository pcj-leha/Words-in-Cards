import $api from '../http'

export default class AuthService {
    static async login(email, password) {
        return $api.post('/user/login', { email, password })
    }

    static async registration(name, email, password, flag) {
        return $api.post('/user/registration', { name, email, password, flag })
    }

    static async logout() {
        return $api.post('/user/logout')
    }

    static async checkName(name) {
        return $api.post('/user/name', { name })
    }

    static async checkEmail(email) {
        return $api.post('/user/email', { email })
    }

    static async resetMail(email) {
        return $api.post('/user/resetMail', { email })
    }

    static async resetPassword(link, password) {
        return $api.post(`/user/reset/${link}`, { password })
    }
}
