import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '..'
import {
    Container,
    Typography,
    Box,
    IconButton,
    Avatar,
    Grid,
    Card,
    CardContent,
    CssBaseline,
    CardActions,
} from '@mui/material'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Tooltip from '@mui/material/Tooltip'

function CardWord() {
    const params = useParams()
    const navigate = useNavigate()
    const { wordStore } = useContext(Context)
    const [turn, setTurn] = useState(false)
    const [turnDefault, setTurnDefault] = useState(false)
    const [count, setCount] = useState(0)
    const [anchorElUser, setAnchorElUser] = useState(null)

    useEffect(() => {
        wordStore.fatchWordsById(params.id)
    }, [wordStore, params])

    const handleDec = () => {
        if (count > 0) {
            setCount(count - 1)
            setTurn(turnDefault)
        } else {
            setCount(0)
            setTurn(turnDefault)
        }
    }

    const handleInc = () => {
        console.log(wordStore.module_length)
        if (count < wordStore.module_length - 1) {
            setCount(count + 1)
            setTurn(turnDefault)
        } else {
            setCount(0)
            setTurn(turnDefault)
        }
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const changeTurnTerm = () => {
        setTurnDefault(false)
        setTurn(false)
    }

    const changeTurnDefinition = () => {
        setTurnDefault(true)
        setTurn(true)
    }

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Container sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 3,
                        flexGrow: 0,
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigate(`/word/${params.id}`)
                        }}
                        sx={{ p: 0 }}
                    >
                        <Avatar sx={{ bgcolor: '#ff7f50' }}>
                            <ArrowBackIcon />
                        </Avatar>
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 3,
                        flexGrow: 0,
                    }}
                >
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar>
                                <SettingsIcon />
                            </Avatar>
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
                        <MenuItem key={'Термин'} onClick={changeTurnTerm}>
                            <Typography textAlign="center">
                                {'Термин'}
                            </Typography>
                        </MenuItem>

                        <MenuItem
                            key={'Определение'}
                            onClick={changeTurnDefinition}
                        >
                            <Typography textAlign="center">
                                {'Определение'}
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Container>

            <Container component="card" maxWidth="sm">
                <Grid container>
                    <Grid item key="word" xs={12}>
                        <Card>
                            <CardContent>
                                {!turn && wordStore.module.term && (
                                    <Typography
                                        variant="h5"
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        {wordStore.module.term[count]}
                                    </Typography>
                                )}
                                {turn && wordStore.module.definition && (
                                    <Typography
                                        variant="h5"
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        {wordStore.module.definition[count]}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Container sx={{ display: 'flex' }}>
                                    <IconButton onClick={handleDec}>
                                        <Avatar sx={{ bgcolor: '#3874cb' }}>
                                            <ArrowBackIosNewIcon />
                                        </Avatar>
                                    </IconButton>
                                    <Box sx={{ flexGrow: 1 }} />

                                    <IconButton
                                        onClick={() => {
                                            setTurn(!turn)
                                        }}
                                    >
                                        <Avatar sx={{ bgcolor: '#3874cb' }}>
                                            <ThreeSixtyIcon />
                                        </Avatar>
                                    </IconButton>

                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton onClick={handleInc}>
                                        <Avatar sx={{ bgcolor: '#3874cb' }}>
                                            <ArrowForwardIosIcon />
                                        </Avatar>
                                    </IconButton>
                                </Container>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default observer(CardWord)
