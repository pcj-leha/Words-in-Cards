import React, { useContext, useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import { ThreeCircles } from 'react-loader-spinner'

import { Context } from '..'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [flag, setFlag] = useState(false)
    const [color, setColor] = useState('primary')
    const [text, setText] = useState('Проверить имя')
    const { userStore } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth().then(() => {
                if (userStore.isAuth) {
                    navigate('/')
                }
            })
            // eslint-disable-next-line
        }
    }, [userStore, navigate])

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

    const checkName = async (e) => {
        e.preventDefault()
        userStore.checkName(name).then(() => {
            if (userStore.check_name) {
                setColor('error')
                setText('Имя занято')
            } else {
                setColor('success')
                setText('Имя свободно')
            }
        })
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
                    Регистрация
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="User Name"
                        value={name}
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <Button onClick={(e) => checkName(e)} color={color}>
                        {text}
                    </Button>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
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
                    <TextField
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="confirm Password"
                        value={confirmPassword}
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                    />
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="allowExtraEmails"
                                    checked={flag}
                                    onChange={() => setFlag(!flag)}
                                    color="primary"
                                />
                            }
                            label="Я хочу получать письма с рекламными акциями и обновлениями по электронной почте."
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => {
                            e.preventDefault()
                            userStore
                                .registration(name, email, password, flag)
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
                        Регистрация
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button
                                variant="text"
                                onClick={() => navigate('/login')}
                            >
                                Уже есть аккаунт? Вход
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default RegistrationForm
