import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const labelStyle = {mt:1};
const AuthForm = ({onSubmit, isAdmin}) => {
    
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
    })
    

    const handleChange = (e) => {
         setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit({inputs, signup: isAdmin? false: IsSignup} ); 
    }

    const [IsSignup, setIsSignup] = useState(false);


  return (
    <Dialog PaperProps={{ style: {borderRadius: 20}}} open={true}>
        <Box sx={{ml: "auto", padding: 1}}>
            <IconButton>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>
        <Typography sx={labelStyle} variant='h4' textAlign="center">
            {IsSignup ? "Signup" : "Login"} 
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box
               padding={6}
               display={"flex"}
               justifyContent={"center"}
               flexDirection={"column"}
               width={400}
               margin={"auto"}
               alignContent={"center"}
            >    
                {!isAdmin && IsSignup && 
                <>
                     <FormLabel sx={labelStyle} > Name </FormLabel>
                     <TextField
                      value={inputs.name}
                      onChange={handleChange}
                      margin='normal' variant='standard' type={"text"} name='name'>   
                      </TextField>

                </>
                }

                <FormLabel sx={labelStyle} > Email </FormLabel>
                <TextField 
                value={inputs.email}
                onChange={handleChange}
                margin='normal' variant='standard' type={"text"} name='email'>
                </TextField>

                <FormLabel sx={labelStyle} > Password </FormLabel>
                <TextField 
                value={inputs.password}
                onChange={handleChange}
                margin='normal' variant='standard' type={"password"} name='password'>
                </TextField>

                <Button 
                
                sx={{mt:3, borderRadius: 10, bgcolor:"#2b2d42"}}
                type="submit"
                fullWidth
                variant='contained'
                >
                   {IsSignup ? "Signup" : "Login"}
                </Button>
                {
                !isAdmin && 
                
                    <Button 
                    onClick={() => setIsSignup(!IsSignup)}
                    sx={{mt:3, borderRadius: 10}}
                    fullWidth
                    >
                    Switch to {IsSignup ? "Login" : "Signup"}
                    </Button>
                
                }
            </Box>

        </form>
    </Dialog>
  )
}

export default AuthForm
