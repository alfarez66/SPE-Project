// import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
// import { Field, Formik } from "formik";
// import * as yup from "yup"
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/header";
// import { useRef, useState } from "react";
// import axios from "axios";

// const initialValues = {
//     name: "",
//     email:"",
//     contact:"",
//     access:"User",
//     password:""
// }

// const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

// const userSchema = yup.object().shape({
//     firstname:yup.string().required("required"),
//     lastname:yup.string().required("required"),
//     email:yup.string().email("invalid email").required("required"),
//     contact:yup.string().matches(phoneRegExp, "Phone number invalid").required("required"),
//     password:yup.string().required("required"),
//     address1:yup.string().required("required"),
//     address2:yup.string().required("required"),
// })

// const Form = ()=>{
//     const isNonMobile = useMediaQuery("(min-width:600px)")

//     const handleFormSubmit = async ( values)=>{
//         console.log(values)
//     try{
//         const formData = new FormData();
//         formData.append('name',values.name)
//         formData.append('email',values.email)
//         formData.append('contact',values.contact)
//         formData.append('password',values.password)
//         formData.append('access',values.access)
        

//         const response = await axios.post("http://localhost:5000/user", formData,{
//             headers:{'Content-Type':'multipart/form-data'},
//         })
//         if(response.contact === 200){
//             console.log("success")
//             console.log("Report details: ", response.data)
//         } else {
//             console.error('Error', response.contact)
//         }
//     } catch (error){
//         console.error('Error', error);
//     }
//     }
//     return (
//         <Box m="20px" >
//             <Header title="CREATE USER" subtitle="Create a New User Profile" />
//             <Formik
//                 onSubmit={handleFormSubmit}
//                 initialValues={initialValues}
//                 // validationSchema={userSchema}
//             >
//                 {({values,errors, touched,handleBlur,handleChange,handleSubmit, setFieldValue})=>(
//                     <form onSubmit={handleSubmit} >
//                         <Box 
//                         display="grid" 
//                         gap="30px" 
//                         gridTemplateColumns="repeat(4, minmax(0,1fr))" 
//                         sx={{
//                             "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
//                         }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="name"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.name}
//                                 name="name"
//                                 error={!!touched.name && !!errors.name}
//                                 helperText={touched.name && errors.name}
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="Email"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.email}
//                                 name="email"
//                                 error={!!touched.email && !!errors.email}
//                                 helperText={touched.email && errors.email}
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 variant="filled"
//                                 type="text"
//                                 label="Contact Number"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.contact}
//                                 name="contact"
//                                 error={!!touched.contact && !!errors.contact}
//                                 helperText={touched.contact && errors.contact}
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 name="password"
//                                 variant="filled"
//                                 label="Password"
//                                 type="password"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.password}
//                                 error={!!touched.password && !!errors.password}
//                                 helperText={touched.password && errors.password}
//                                 id="password"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 name="access"
//                                 variant="filled"
//                                 label="Access"
//                                 type="text"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.access}
//                                 error={!!touched.access && !!errors.access}
//                                 helperText={touched.access && errors.access}
//                                 id="access"
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             {/* <Field name="access">
//                                 {({ field }) => (
//                                 <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
//                                     <Select
//                                     {...field}
//                                     label="Access"
//                                     >
//                                     <MenuItem value="User">User</MenuItem>
//                                     <MenuItem value="Manager">Manager</MenuItem>
//                                     <MenuItem value="Admin">Admin</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                                 )}
//                             </Field> */}


//                         </Box>
//                         <Box display="flex" justifyContent="end" mt="20px" >
//                             <Button type="submit" color="secondary" variant="contained" >
//                             Create New User
//                             </Button>
//                         </Box>
//                     </form>
//                 )}
//             </Formik>
//         </Box>
//     )
// }

// export default Form



import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import axios from "axios";

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


const convertBase64 = (file) => {
    return new Promise((resolve, reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
        })
}

const validateuserId = (userId) => {
    if (!userId) {
    return "User ID is required";
    }

    if (isNaN(userId)) {
    return "User ID must be a number";
    }

    return null;
};


const Upload = ()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)")
    
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
            
            const response = await axios.post("http://localhost:5000/inputUser", formData,{
                // set the content type for FormData
                headers:{'Content-Type':'multipart/form-data'},
            });

            console.log(response.data)
            if (response.status ===200){
                //success
                console.log("success")
                console.log("Report details:", response.data)

            } else {
                //error
                console.error('Error',response.status)
            }
        } catch (error){
            console.error('Error', error)
        }

    }
    return (
        <Box m="20px" >
            <Header title="CREATE REPORT" subtitle="Create a New Report" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
            >
                {({values,errors, touched,handleBlur,handleChange,handleSubmit, setFieldValue})=>(
                    <form onSubmit={handleSubmit} >
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax(0,1fr))" 
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="User ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userId}
                            name="userId"
                            error={!!touched.userId && !!errors.userId}
                            helperText={touched.userId && errors.userId}
                            sx={{ gridColumn: "span 4" }}
                            /> */}

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

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px" >
                            <Button type="submit" color="secondary" variant="contained" >
                                Create Report
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Upload