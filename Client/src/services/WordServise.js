import $api from '../http'

export default class WordService {
    static async createWord(name, term, definition, userId) {
        return $api.post('/word/postWord', { name, term, definition, userId })
    }

    static async fetchAllWords() {
        return $api.get(`/word/words`)
    }

    static async fetchOneWord(id) {
        return $api.get(`/word/${id}`)
    }

    static async fetchAllUserWords(userId) {
        return $api.get(`/word/user/${userId}`)
    }
}
