import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import StyleIcon from '@mui/icons-material/Style'
import { ThreeCircles } from 'react-loader-spinner'

import { useEffect, useContext, useState } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

function ResponsiveAppBar() {
    const { userStore } = useContext(Context)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth()
            // eslint-disable-next-line
        }
    }, [userStore])

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

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static" sx={{ bgcolor: '#ff7f50' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* иконка для больших экранов */}
                    <StyleIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
                        fontSize="large"
                    />
                    <Typography
                        variant="h2"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Учи-слова
                    </Typography>

                    {/* иконка для маленьких экранов */}
                    <StyleIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                        fontSize="large"
                    />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Учи-слова
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }} />

                    {userStore.isAuth && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={userStore.user.name}
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    key={'Аккаунт'}
                                    onClick={() =>
                                        navigate('/users/' + userStore.user.id)
                                    }
                                >
                                    <Typography textAlign="center">
                                        {'Аккаунт'}
                                    </Typography>
                                </MenuItem>

                                <MenuItem
                                    key={'Создать модуль'}
                                    onClick={() => navigate('/createWord')}
                                >
                                    <Typography textAlign="center">
                                        {'Создать модуль'}
                                    </Typography>
                                </MenuItem>

                                {/* <MenuItem
                                    key={'О нас'}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {'О нас'}
                                    </Typography>
                                </MenuItem> */}

                                <MenuItem
                                    key={'Выйти'}
                                    onClick={() => userStore.logout()}
                                >
                                    <Typography textAlign="center">
                                        {'Выйти'}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                    {!userStore.isAuth && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate('/registration')}
                                >
                                    Регистрация
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/login')}
                                >
                                    Вход
                                </Button>
                            </Stack>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{ display: { xs: 'flex', sm: 'none' } }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/login')}
                                >
                                    Вход
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default observer(ResponsiveAppBar)
