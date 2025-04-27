import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import { useNavigate, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
    Container,
    Typography,
    Box,
    IconButton,
    Avatar,
    Grid,
    Card,
    CardContent,
    Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function WordPage() {
    const params = useParams()
    const navigate = useNavigate()
    const { wordStore } = useContext(Context)

    useEffect(() => {
        wordStore.fatchWordsById(params.id)
    }, [wordStore, params])

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
                        navigate(`/users/${wordStore.module.userId}`)
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
                <h1>{wordStore.module.name}</h1>
            </Box>
            <Container maxWidth="md">
                <Button
                    onClick={() => {
                        navigate(`/word/card/${wordStore.module.id}`)
                    }}
                    variant="contained"
                    size="medium"
                    sx={{ mr: 2, marginBottom: 3 }}
                >
                    Изучать с помощью карточек
                </Button>
                <Button
                    onClick={() => {
                        navigate(`/word/memorization/${wordStore.module.id}`)
                    }}
                    variant="contained"
                    size="medium"
                    sx={{ marginBottom: 3 }}
                >
                    Режим заучивания
                </Button>
            </Container>
            <Container maxWidth="md" sx={{ marginBottom: 10 }}>
                <Grid container spacing={4}>
                    {wordStore.module.term?.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography>{`Термин:`}</Typography>
                                    <Typography>{card}</Typography>
                                    <Typography>{`Определение:`}</Typography>
                                    <Typography>
                                        {wordStore.module.definition[index]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
}

export default observer(WordPage)
