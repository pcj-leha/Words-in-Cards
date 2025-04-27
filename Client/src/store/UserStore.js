import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import { API_URL } from '../http'

export default class UserStore {
    isAuth = false
    user = {}
    isLoading = false
    isError = {}
    check_name = true
    check_email = true
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    setError(error) {
        this.isError = error
    }

    setCheck_name(name) {
        this.check_name = name
    }

    setCheck_email(email) {
        this.check_email = email
    }

    async login(email, password) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setError(response.status)
        } catch (e) {
            console.log(e.response?.data)
            this.setError(e.response?.data)
        } finally {
            this.setLoading(false)
        }
    }

    async registration(name, email, password, flag) {
        this.setLoading(true)
        try {
            const response = await AuthService.registration(
                name,
                email,
                password,
                flag
            )
            console.log(response)
            console.log(flag)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setError(response.status)
        } catch (e) {
            console.log(e.response?.data)
            this.setError(e.response?.data)
        } finally {
            this.setLoading(false)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/user/refresh`, {
                withCredentials: true,
            })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setError(response.status)
        } catch (e) {
            console.log(e.response?.data)
            this.setError(e.response?.data)
        } finally {
            this.setLoading(false)
        }
    }

    async checkName(name) {
        try {
            const response = await AuthService.checkName(name)
            this.setCheck_name(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkEmail(email) {
        try {
            const response = await AuthService.checkEmail(email)
            this.setCheck_email(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async resetMail(email) {
        try {
            const response = await AuthService.resetMail(email)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async resetPassword(link, email) {
        try {
            const response = await AuthService.resetPassword(link, email)
            this.setError(response?.status)
        } catch (e) {
            alert(e.response.data.message)
            this.setError(e.response.data.status)
        }
    }
}
