import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import WordStore from './store/WordStore'
import './index.css'

const userStore = new UserStore()
const wordStore = new WordStore()

export const Context = createContext({
    userStore,
    wordStore,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Context.Provider value={{ userStore, wordStore }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
)
