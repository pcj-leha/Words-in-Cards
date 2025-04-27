import { useEffect, useContext, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CssBaseline from '@mui/material/CssBaseline'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

function CreateWord() {
    const [formFields, setFormFields] = useState([{ term: '', definition: '' }])
    const [name, setName] = useState('')
    const { userStore, wordStore } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth().then(() => {
                if (!userStore.isAuth) {
                    navigate('/')
                }
            })
            // eslint-disable-next-line
        } else {
            navigate('/')
        }
    }, [userStore, navigate])

    const handleFormChange = (event, index) => {
        let data = [...formFields]
        data[index][event.target.name] = event.target.value
        setFormFields(data)
    }

    const submit = async (e) => {
        e.preventDefault()
        let termin = []
        let opredelenie = []
        var index, len
        for (index = 0, len = formFields.length; index < len; ++index) {
            termin.push(formFields[index].term)
            opredelenie.push(formFields[index].definition)
        }
        const responce = await wordStore.createWord(
            name,
            termin,
            opredelenie,
            userStore.user.id
        )
        navigate(`/word/${responce.data.id}`)
    }

    const addFields = () => {
        let object = {
            term: '',
            definition: '',
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields]
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <Container maxWidth="sm">
            <CssBaseline />
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
                component="form"
                noValidate
                sx={{ mt: 1, alignItems: 'center' }}
            >
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="name modul"
                    label="Name modul"
                    value={name}
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
            </Box>
            <form onSubmit={submit}>
                {formFields.map((form, index) => (
                    <Box key={index}>
                        <TextField
                            sx={{ mr: 1, marginBottom: 1 }}
                            name="term"
                            placeholder="Термин"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.term}
                        />
                        <TextField
                            sx={{ marginBottom: 3 }}
                            name="definition"
                            placeholder="Определение"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.definition}
                        />
                        <IconButton
                            aria-label="delete"
                            size="large"
                            type="button"
                            onClick={() => removeFields(index)}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                ))}
            </form>
            <IconButton onClick={addFields} sx={{ p: 0, mr: 2 }}>
                <Avatar sx={{ bgcolor: '#3874cb' }}>
                    <AddIcon />
                </Avatar>
            </IconButton>

            <Button
                onClick={submit}
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
            >
                Создать модуль
            </Button>
        </Container>
    )
}

export default CreateWord
