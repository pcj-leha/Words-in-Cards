import {
    CARD_WORD_ROUTE,
    CREATE_WORD_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE,
    WORD_USER_ROUTE,
    MEMORIZATION_ROUT,
    RESET_ROUTE,
} from './utils/constans'
import CreateWord from './page/CreateWord'
import CardWord from './page/CardWord'
import LoginForm from './page/LoginForm'
import MainPage from './page/MainPage'
import RegistrationForm2 from './page/RegistrationForm2'
import UserPage from './page/UserPage'
import WordPage from './page/WordPage'
import MemorizationWords from './page/MemorizationWords'
import ResetPassword from './page/ResetPassword'

export const authRoutes = [
    {
        path: CREATE_WORD_ROUTE,
        Component: CreateWord,
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginForm,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationForm2,
    },
    {
        path: WORD_USER_ROUTE,
        Component: WordPage,
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: USER_ROUTE,
        Component: UserPage,
    },
    {
        path: CARD_WORD_ROUTE,
        Component: CardWord,
    },
    {
        path: MEMORIZATION_ROUT,
        Component: MemorizationWords,
    },
    {
        path: RESET_ROUTE,
        Component: ResetPassword,
    },
]
