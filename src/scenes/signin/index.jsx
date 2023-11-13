import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../api/axios';
import { Formik } from 'formik';
import { Grid, useMediaQuery } from '@mui/material';
// import { useCookies } from 'react-cookie';
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function SignIn() {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    // const cookies = new Cookies()
    const navigate = useNavigate()
    const [cookies,setCookie, removeCookie] = useCookies(["jwt"])

    const initialValues = {
        // reportId: "",
        userId: 0,
        date: new Date().toISOString().slice(0,10),
        name:"",
        email:"",
        image:null,
        contact:"",
        password:"",
        priority:"",
        // accessControl:""
    };

    const handleFormSubmit = async ( values)=>{
        // console.log("Image Data:", values.image); // Add this line
    
        try{
            const formData = new FormData();
            formData.append('email', values.email)
            formData.append('password', values.password)
            
            const response = await axios.post("/login", formData,{
                // set the content type for FormData
                transformRequest : (data, headers) => {
                    //headers.delete('Authorization')
                    headers.setContentType('multipart/form-data')
                    headers.setAccept('multipart/form-data')
                    return data
                }
                
            });
    
            console.log("response ", response)

            if (response.status ===201){
                //success
                const token = response.data.token
                setCookie('jwt', token, {path:'/',maxAge:24 * 60 * 60, HttpOnly:true, Secure: true})
                // cookies.set("jwt", token,{
                //     path:'/',
                //     maxAge:24 * 60 * 60,
                //     // expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                //     secure:true,
                // })

                // console.log(document.cookie)
                console.log("success")
                console.log("Report details:", response.data)
                navigate("/");
            } else {
                //error
                console.error('Error',response.status)
            }
        } catch (error){
            console.error('Error', error)
        }
    
    }

return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            // validationSchema={userSchema}
        >
            {({values,errors, touched,handleBlur,handleChange,handleSubmit})=>(
                <form onSubmit={handleSubmit} >
                    <Box 
                    display="grid" 
                    gap="30px" 
                    gridTemplateColumns="repeat(4, minmax(0,1fr))" 
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
                    }}
                    >
                        
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="User Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                            />

                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                            LOGIN
                        </Button>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
);
}