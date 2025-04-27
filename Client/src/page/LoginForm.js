import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useContext, useState, useEffect } from 'react'
import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import { ThreeCircles } from 'react-loader-spinner'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AuthService from '../services/AuthService'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [EmailReset, setEmailReset] = useState('')

    const { userStore } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth().then(() => {
                if (userStore.isAuth) {
                    navigate('/')
                }
            })
        }
    }, [navigate, userStore])

    if (userStore.isLoading) {
        return (
            <div className="loader">
                <ThreeCircles
                    height="200"
                    width="200"
                    color="#ff7f50"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                />
            </div>
        )
    }

    const handleClickOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleCloseForReset = async () => {
        setOpenDialog(false)
        userStore.resetMail(EmailReset)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexGrow: 0,
                }}
            >
                <IconButton
                    onClick={() => {
                        navigate('/')
                    }}
                    sx={{ p: 0 }}
                >
                    <Avatar sx={{ bgcolor: '#ff7f50' }}>
                        <ArrowBackIcon />
                    </Avatar>
                </IconButton>
            </Box>
            <Box
                sx={{
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#ff7f50' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        value={password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => {
                            e.preventDefault()
                            userStore
                                .login(email, password)
                                .then(() => {
                                    if (userStore.isError === 200) {
                                        navigate('/')
                                    } else {
                                        alert(userStore.isError.message)
                                    }
                                })
                                .catch((e) => console.error(e))
                        }}
                    >
                        Вход
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button variant="text" onClick={handleClickOpen}>
                                Забыл пароль?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                onClick={() => navigate('/registration')}
                            >
                                Нет аккаунта? Регистрация
                            </Button>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Сброс пароля!
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Введите свой email, на который зарегестрирован
                                аккаунт. На данный адресс электронной почты
                                будет направлено письмо со ссылкой на страницу
                                сброса пароля.
                            </DialogContentText>
                            <TextField
                                onChange={(e) => setEmailReset(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="reset"
                                label="Email"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Закрыть
                            </Button>
                            <Button
                                onClick={handleCloseForReset}
                                color="primary"
                            >
                                Сбросить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Container>
    )
}
