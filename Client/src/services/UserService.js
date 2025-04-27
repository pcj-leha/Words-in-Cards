import $api from '../http'

export default class UserService {
    static async fetchAllUsers() {
        return $api.get('/user/users')
    }

    static async fetchOneUser(id) {
        return $api.get(`/user/users/${id}`)
    }
}
