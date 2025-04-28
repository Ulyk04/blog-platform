import React, { useState } from 'react'
import {AppProvider} from '@toolpad/core/AppProvider'
import {SignInPage} from '@toolpad/core/SignInPage'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import {  createTheme } from '@mui/material/styles'
import { Button,  Switch,  Link , Typography } from '@mui/material'
import { Box } from '@mui/system'

const label = {inputProps: {'aria-label': 'Size switch demo' }}
const providers = [{id: 'credentials' , name: 'Email and Password'}]

function SignLink() {
    return(
        <Link href='/' variant='body2' >
            Sign up
        </Link>
    )
}
function LoginButton() {
    return(
        <Button 
            type="submit"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
        >
            Log In
        </Button>
    )
}

const LoginPage = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState('light');

    const handleModeChange = (event) => {
        setMode(event.target.checked ? 'dark' : 'light');
      };

        
    const Theme = createTheme({
        palette: {
            mode: mode 
        }
    })

    const handleLogin = async(provider , formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        try{
            const res = await axios.post('https://localhost:5000/login' , {
                email , password
            });
            alert(res.data.message)
            navigate('/hello')
        } catch (error) {
            alert(error.response?.data?.message || 'Login Error');
        }
    }

  return (
    
    <AppProvider theme={Theme} >
        <Box sx={{display: 'flex' , justifyContent: 'center' , marginTop: '15%' , alignItems: 'center' , flexDirection: 'column'}} >
            <Typography variant="h1">Welcome to my App</Typography>
            <Switch {...label} defaultChecked={mode === 'dark'} size="large" onChange={handleModeChange} />
        </Box>
        <SignInPage
            signIn={handleLogin}
            providers={providers}
            sx={{marginTop: '-15%'}}
            slots={{
                signUpLink: SignLink,
                submitButton: LoginButton
            }}
        />
    </AppProvider>
  )
}

export default LoginPage