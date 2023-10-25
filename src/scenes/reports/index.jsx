import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReportGrid from "../../components/Report";


const Report = () =>{
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // const columns = [
    //     {field:"id", headerName:"ID"},
    //     {
    //         field:"name",
    //         header: "Name",
    //         flex: 1,
    //         cellClassName: "name-column--cell"
    //     },
    //     {
    //         field: "cost",
    //         headerName: "Cost",
    //         flex: 1,
    //         renderCell: (params) => (
    //             <Typography color={colors.greenAccent[500]}>
    //                 ${params.row.cost}
    //             </Typography>
    //         ),
    //     },
    //     {
    //         field: "date",
    //         headerName: "Date",
    //         flex: 1,
    //     },
    // ]
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" >
                <Box display="flex" >
                    <Header title="Report" subtitle="List of Report"/>
                </Box>
                <Box display="flex" padding="30px 0 " >
                    <Button 
                    type="button" 
                    color="secondary" 
                    variant="contained" 
                    component={Link}
                    to="/report/create"
                    startIcon={<FileUploadIcon/>}
                    >
                        Upload Report
                    </Button>
                </Box>
                </Box>
            <Box
                m="40px 0 0 0"
                height="70vh"
                sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                    
                },
                "& .MuiButtonBase-root":{
                    color: colors.grey[400]
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
            }}
            >
                {/* <DataGrid  checkboxSelection rows={mockDataInvoices} columns={columns} /> */}
                <ReportGrid />
            </Box>
        </Box>
    )
}

export default Report