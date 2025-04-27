import React, { useContext, useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { ThreeCircles } from 'react-loader-spinner'

import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function ResetPassword() {
    const link = window.location.pathname.slice(7)
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
        userStore.resetPassword(link, data.password).then(() => {
            if (userStore.isError === 200) {
                navigate('/login')
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#ff7f50' }}>
                    <RestartAltIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Сброс пароля
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mt: 1 }}>
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
                    </Box>
                    <Button
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Сбросить пароль
                    </Button>
                </form>
            </Box>
        </Container>
    )
}
