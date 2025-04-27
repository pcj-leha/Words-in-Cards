import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Avatar,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React, { useContext, useEffect } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

function UserPage() {
    const { wordStore } = useContext(Context)
    const navigate = useNavigate()
    const userId = window.location.pathname.slice(7)
    useEffect(() => {
        async function load() {
            await wordStore.fatchUser(userId)
            await wordStore.fatchWordsByUser(userId)
        }
        load()
    }, [wordStore, userId])

    if (wordStore.isLoading) {
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

    return (
        <Container position="fixed">
            <Box
                sx={{
                    marginTop: 5,
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
                    marginTop: 0,
                    marginBottom: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>{wordStore.userName}</h1>
            </Box>

            <Container maxWidth="md" sx={{ marginBottom: 10 }}>
                {/* {console.log(wordStore.cards.map())} */}
                <Grid container spacing={4}>
                    {wordStore.cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography>{card.name}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            navigate(`/word/${card.id}`)
                                        }}
                                    >
                                        Изучать модуль!
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
}

export default observer(UserPage)
