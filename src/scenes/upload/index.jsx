import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import axios from "axios";
import jwt from "jwt-decode";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";

const initialValues = {
    // reportId: "",
    userId: 0,
    date: new Date().toISOString().slice(0,10),
    description:"",
    status:"",
    image:null,
    location:"",
    assignee:"",
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

// const saveFileToDatabase = async (file) => {
//     // convert to byte array
//     const reader = new FileReader()
//     reader.onload = async () => {
//         //encode the bay to a base64 string
//         const base64String = btoa(reader.result)

//         // insert the base64 string into the database
//         const response = await axios.post("/api/reports/save-file", { file: base64String})

//         if (response.status === 200){
//             //            console.log("success")
//         } else{
//             //                console.error(`Error saving file ${base64String}`)
//         }

//         reader.readAsArrayBuffer(file)
//     }
// }

// const handleFormSubmit = async (values) => {
//     // save the image file to the database
//     await saveFileToDatabase(values.image)

//     //submit the rest of the form data to the API
//     const response = await axios.post("/api/reports", values)

//     if(response.status === 200){
//         //        alert('Report saved successfully')
//     } else {
//         //        alert(`${response.data}`);
//     }
// }

const Upload = ()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [file, setFile] = useState()
    
    const [cookies] = useCookies(["jwt"])
    const [jwtToken, setJwtToken] = useState("")

    useEffect(() => {
        if(cookies.jwt){
        const decodeToken = jwt(cookies.jwt)
        const email = decodeToken.email
        
        setJwtToken(cookies.jwt)
        
        async function fetchAccountData(email){
            try{
            const response = await axios.get(`/account/${email}`,{})
            } catch(error){
            console.error("error fetching account data", error)
            }
        }
        fetchAccountData(email)
        }
    }, [cookies])

    const handleFormSubmit = async ( values)=>{
        console.log("Image Data:", values.image); // Add this line

        try{
            const formData = new FormData();
            formData.append('userId', values.userId)
            formData.append('date', values.date)
            formData.append('description', values.description)
            formData.append('status', values.status)
            formData.append('location', values.location)
            formData.append('assignee', values.assignee)
            // // formData.append('priority', values.priority)
            formData.append('image', file)
            console.log(file)
            const response = await axios.post("http://localhost:5000/report", formData,{
                // set the content type for FormData
                headers:{'Content-Type':'multipart/form-data'},
            })
            .then( res => {})
            .catch(er => console.log(er))
            ;

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
                            type="text"
                            label="Report ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.reportID}
                            name="reportID"
                            error={!!touched.reportID && !!errors.reportID}
                            helperText={touched.reportID && errors.reportID}
                            sx={{ gridColumn: "span 4" }}
                            /> */}

                            <TextField
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
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Report Description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={!!touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Report status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.status}
                            name="status"
                            error={!!touched.status && !!errors.status}
                            helperText={touched.status && errors.status}
                            sx={{ gridColumn: "span 4" }}
                            />

                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="file"
                            label="Image/File URL"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.imageURL}
                            name="imageURL"
                            error={!!touched.imageURL && !!errors.imageURL}
                            helperText={touched.imageURL && errors.imageURL}
                            sx={{ gridColumn: "span 4" }}
                            /> */}

                            {/* <TextField
                                fullWidth
                                variant="filled"
                                label="Image/File"
                                InputProps={{
                                    type: 'file',
                                    onChange: (event) => {
                                        const selectedFile = event.target.files[0];
                                        setFieldValue("image", selectedFile);
                                    },
                                }}
                                error={!!touched.image && !!errors.image}
                                helperText={touched.image && errors.image}
                                sx={{ gridColumn: "span 4" }}
                            /> */}

                            <TextField
                                fullWidth
                                variant="filled"
                                // label="Image/File"
                                InputProps={{
                                    type: 'file',
                                    onChange: (event) => {
                                        setFile(event.target.files[0])
                                        // const selectedFile = event.target.files[0];
                                        // if(selectedFile){
                                        //     const base64 = await convertBase64(selectedFile);
                                        //     setFieldValue("image", base64);
                                        // }
                                    },
                                }}
                                error={!!touched.image && !!errors.image}
                                helperText={touched.image && errors.image}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Location/Geotag"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={!!touched.location && !!errors.location}
                            helperText={touched.location && errors.location}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Report Owner/Assignee"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.assignee}
                            name="assignee"
                            error={!!touched.assignee && !!errors.assignee}
                            helperText={touched.assignee && errors.assignee}
                            sx={{ gridColumn: "span 4" }}
                            />

                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            // label="Priority"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            // value={values.priority}
                            // name="priority"
                            // // error={!!touched.priority && !!errors.priority}
                            // // helperText={touched.priority && errors.priority}
                            sx={{ gridColumn: "span 4" }}
                            /> */}

                            {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Access Control"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accessControl}
                            name="accessControl"
                            error={!!touched.accessControl && !!errors.accessControl}
                            helperText={touched.accessControl && errors.accessControl}
                            sx={{ gridColumn: "span 4" }}
                            /> */}

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