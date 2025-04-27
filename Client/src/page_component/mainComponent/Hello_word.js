import { Container, Typography } from '@mui/material'
import React from 'react'

export default function Hello_word() {
    return (
        <Container maxWidth="md">
            <Typography
                variant="h2"
                style={{
                    textAlign: 'center',
                }}
            >
                Здравствуй, дорогой пользователь, рад представить тебе новое
                приложение Учи слова, которое создано для замены Quizlet. В
                данный момент приложение находится в стадии доработки!
            </Typography>
        </Container>
    )
}
