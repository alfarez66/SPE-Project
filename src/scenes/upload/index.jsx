import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";

// const initialValues = {
//     name: "",
//     date:"",
//     contact:"",
//     location:"",
//     case:"",
//     status:"",
//     diagnose:"",
//     image:"",
// }

const initialValues = {
    reportId: "",
    userId:"",
    date: new Date(),
    description:"",
    status:"",
    image:"",
    location:"",
    assignee:"",
    priority:"",
    assignee:"",
    accessControl:""
};

const Upload = ()=>{
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = ( values)=>{
        console.log(values)
    }
    return (
        <Box m="20px" >
            <Header title="CREATE USER" subtitle="Create a New User Profile" />
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
                            label="Report ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.reportID}
                            name="reportID"
                            error={!!touched.reportID && !!errors.reportID}
                            helperText={touched.reportID && errors.reportID}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="User ID"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userID}
                            name="userID"
                            error={!!touched.userID && !!errors.userID}
                            helperText={touched.userID && errors.userID}
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
                            value={values.reportDescription}
                            name="reportDescription"
                            error={!!touched.reportDescription && !!errors.reportDescription}
                            helperText={touched.reportDescription && errors.reportDescription}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Report Status"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.reportStatus}
                            name="reportStatus"
                            error={!!touched.reportStatus && !!errors.reportStatus}
                            helperText={touched.reportStatus && errors.reportStatus}
                            sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Image/File URL"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.imageURL}
                            name="imageURL"
                            error={!!touched.imageURL && !!errors.imageURL}
                            helperText={touched.imageURL && errors.imageURL}
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

                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Priority"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.priority}
                            name="priority"
                            error={!!touched.priority && !!errors.priority}
                            helperText={touched.priority && errors.priority}
                            sx={{ gridColumn: "span 4" }}
                            />

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