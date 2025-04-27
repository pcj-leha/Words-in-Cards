import WordService from '../services/WordServise'
import UserService from '../services/UserService'
import { makeAutoObservable } from 'mobx'

export default class WordStore {
    cards = []
    userName = ''
    isLoading = false
    module = {}
    module_length = 0
    constructor() {
        makeAutoObservable(this)
    }

    setCards(cards) {
        this.cards = cards
        console.log(cards)
    }

    setUserName(user) {
        this.userName = user
    }

    setModule(modules) {
        this.module = modules
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    setModule_length(length) {
        this.module_length = length
    }

    async createWord(name, term, definition, userId) {
        this.setLoading(true)
        try {
            const response = await WordService.createWord(
                name,
                term,
                definition,
                userId
            )
            return response
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }
    async fatchWordsByUser(userId) {
        this.setLoading(true)
        try {
            const response = await WordService.fetchAllUserWords(userId)
            this.setCards(response.data)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async fatchWordsById(wordId) {
        this.setLoading(true)
        try {
            const response = await WordService.fetchOneWord(wordId)
            this.setModule(response.data)
            this.setModule_length(response.data.term.length)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false)
        }
    }

    async fatchUser(userId) {
        this.setLoading(true)
        try {
            const response = await UserService.fetchOneUser(userId)
            this.setUserName(response.data.name)
        } catch (e) {
            console.log(e)
            const user = 'Underfined!'
            this.setUserName(user)
        } finally {
            this.setLoading(false)
        }
    }
}
