import React, { useState } from 'react'
import {AppProvider} from '@toolpad/core/AppProvider'
import {SignInPage} from '@toolpad/core/SignInPage'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import {  createTheme } from '@mui/material/styles'
import {  Switch,  Link, Typography } from '@mui/material'
import { Box } from '@mui/system'

const label = {inputProps: {'aria-label': 'Size switch demo' }}
const providers = [{id: 'credentials' , name: 'Email and Password'}]

function LoginLink() {
    return(
        <Link href='/login' variant='body2' >
            Login
        </Link>
    )
}

const SignUpPage = () => {
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
            const res = await axios.post('http://localhost:5000' , {
                email , password
            });
            alert(res.data.message)
            navigate('/home')
        } catch (error) {
            alert(error.response?.data?.message || 'Sign Up Error');
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
                signUpLink: LoginLink
            }}
        />
    </AppProvider>
  )
}

export default SignUpPage
