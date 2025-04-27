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
import Chip from '@mui/material/Chip'
import { ThreeCircles } from 'react-loader-spinner'

import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
    const [flag, setFlag] = useState(false)
    const [textName, setTextName] = useState('')
    const [textEmail, setTextEmail] = useState('')
    const [colorName, setColorName] = useState('primary')
    const [colorEmail, setColorEmail] = useState('primary')
    const [loading, setLoading] = useState(false)
    const { userStore } = useContext(Context)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({ mode: 'onBlur' })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth().then(() => {
                if (userStore.isAuth) {
                    navigate('/')
                }
            })
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

    const onSubmit = async (data) => {
        userStore
            .registration(data.name, data.email, data.password, flag)
            .then(() => {
                if (userStore.isError === 200) {
                    navigate('/')
                } else {
                    alert(userStore.isError.message)
                }
            })
            .catch((e) => console.error(e))
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            label="User name"
                            fullWidth
                            margin="normal"
                            autoComplete="name"
                            autoFocus
                            {...register('name', {
                                required: 'Поле обязательно к заполнению',
                                validate: (value) => {
                                    userStore.checkName(value).then(() => {
                                        console.log(userStore.check_name)
                                        if (userStore.check_name) {
                                            setColorName('error')
                                            setTextName('Имя занято')
                                        } else {
                                            setColorName('success')
                                            setTextName('Имя свободно')
                                        }
                                    })
                                    return !userStore.check_name || ''
                                },
                            })}
                            error={!!errors?.name}
                            helperText={
                                errors?.name ? errors.name.message : null
                            }
                        />
                        {textName && (
                            <Chip label={textName} color={colorName} />
                        )}
                        <TextField
                            variant="outlined"
                            label="Email"
                            fullWidth
                            margin="normal"
                            autoComplete="email"
                            {...register('email', {
                                required: 'Поле обязательно к заполнению',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Некоректный email адресс',
                                },
                                validate: (value) => {
                                    userStore.checkEmail(value).then(() => {
                                        if (userStore.check_email) {
                                            setColorEmail('error')
                                            setTextEmail(
                                                'Уже существует аккаунт с введённым email'
                                            )
                                        } else {
                                            setTextEmail('')
                                        }
                                    })
                                    return !userStore.check_email || ''
                                },
                            })}
                            error={!!errors?.email}
                            helperText={
                                errors?.email ? errors.email.message : null
                            }
                        />
                        {textEmail && (
                            <Chip label={textEmail} color={colorEmail} />
                        )}
                        <TextField
                            variant="outlined"
                            label="Password"
                            fullWidth
                            type="password"
                            margin="normal"
                            autoComplete="password"
                            {...register('password', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Пароль должен содержать не менее 6 символов',
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        'Пароль должен содержать не более 32 символов',
                                },
                            })}
                            error={!!errors?.password}
                            helperText={
                                errors?.password
                                    ? errors.password.message
                                    : 'Пароль должен содержать от 6 до 32 символов'
                            }
                        />
                        <TextField
                            variant="outlined"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            margin="normal"
                            autoComplete="confirm password"
                            {...register('confirmPassword', {
                                required: 'Поле обязательно к заполнению',
                                validate: (value) => {
                                    const { password } = getValues()
                                    return (
                                        password === value ||
                                        'Пароли должны совпадать'
                                    )
                                },
                            })}
                            error={!!errors?.confirmPassword}
                            helperText={
                                errors?.confirmPassword
                                    ? errors.confirmPassword.message
                                    : 'Подтвердите пароль'
                            }
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
                    </Box>
                    <Button
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Регистрация
                    </Button>
                </form>
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
        </Container>
    )
}
