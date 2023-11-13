import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Field, Formik } from 'formik';
import { FormControl, MenuItem, Select, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// function Copyright(props) {
// return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//     {'Copyright © '}
//     <Link color="inherit" href="https://mui.com/">
//         Your Website
//     </Link>{' '}
//     {new Date().getFullYear()}
//     {'.'}
//     </Typography>
// );
// }

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate()
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
    email: data.get('email'),
    password: data.get('password'),
    });
};

const isNonMobile = useMediaQuery("(min-width:600px)")
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
    console.log("Image Data:", values.image); // Add this line

    try{
        const formData = new FormData();
        formData.append('date', values.date)
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('contact', values.contact)
        formData.append('password', values.password)
        formData.append('access', values.access)
        
        const response = await axios.post("http://localhost:5000/register", formData,{
            // set the content type for FormData
            headers:{'Content-Type':'multipart/form-data'},
        });

        console.log(response.data)
        if (response.status ===200){
            //success
            console.log("success")
            console.log("Report details:", response.data)
            navigate('/')
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
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            
        }}
        m="20px"
        >
        <Typography component="h1" variant="h5" style={{ textAlign: 'center', marginTop: 'auto', marginBottom: '30px' }}>
            Sign up
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
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                            />

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
                            type="text"
                            label="Contact"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.contact}
                            name="contact"
                            error={!!touched.contact && !!errors.contact}
                            helperText={touched.contact && errors.contact}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Access"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.access}
                            name="access"
                            error={!!touched.access && !!errors.access}
                            helperText={touched.access && errors.access}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="date"
                            label="Report Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.date}
                            name="date"
                            error={!!touched.date && !!errors.date}
                            helperText={touched.date && errors.date}
                            sx={{ gridColumn: "span 4" , mt:"20px"}}
                            disabled={true}
                            />
                        {/* <Field name="access">
                            {({ field }) => (
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                                <Select
                                {...field}
                                label="Access"
                                >
                                <MenuItem value="User">User</MenuItem>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                            )}
                        </Field> */}

                    </Box>
                    <Box 
                    display="flex" 
                    justifyContent="end" 
                    mt="20px" 
                    >
                        <Button 
                        type="submit" 
                        color="secondary" 
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        >
                            SIGN UP
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
);
}