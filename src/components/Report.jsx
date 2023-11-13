
import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import {DataGrid} from "@mui/x-data-grid"
import {Button} from "@mui/material"
import { Box,Typography } from "@mui/joy";
import { Avatar, IconButton } from "@mui/material";
import imagesActions from "./ReportAction";
import { Modal, Backdrop, Fade } from '@mui/material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

function calculateCompleteness(row) {
    const fieldsToCheck = ['date', 'description', 'image', 'location', 'assignee'];
    const totalFields = fieldsToCheck.length;
    let existingFields = 0;

    fieldsToCheck.forEach(field => {
        if (row[field]) {
            existingFields++;
        }
    });

    const completenessScore = existingFields / totalFields;
    return completenessScore.toFixed(2); // Rounding the completeness score to two decimal places
}







function ReportGrid() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalImageURL, setModalImageURL] = useState('');

    const handleOpenModal = (imageUrl) => {
        axios
            .get(`/report/image/${imageUrl}`)
            .then((response) => {
                const imagePaths = response.data.imagePaths;
                if (imagePaths && imagePaths.length > 0) {
                    setModalImageURL(imagePaths[0]); // Display the first image (or choose the specific image)
                    setOpenModal(true); // Open the modal
                } else {
                    alert('No image found for this report');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to load the image');
            });
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Menutup modal
    };
    
    // const setRows = (rows) => {
    //     return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    // };

    useEffect(()=>{
        setLoading(true);

        axios
        .get('/reports')
        .then((response) => {
            const rows = response.data.rows.map((row,i) => ({ 
                ...row,
                id: i + 1,
                no: i + 1
            }));
            // set the rows
            setRows(rows)
            })
        .catch((error)=>{
            console.log(error)
            // handle error
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])
    
    // Update user based on reportId
    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        const reportId = oldRow.reportid; // Correct reference to 'reportid'
    
        console.log('Report ID:', reportId);
        console.log('Updated Row:', updatedRow);
    
        axios
            .put(`http://localhost:5000/reports/${reportId}`, updatedRow)
            .then((response) => {
                console.log('Update Response:', response.data); // Check the response data
                // Update the user in the frontend if required
                const updatedRows = oldRows.map(row => {
                    if (row.reportid === reportId) {
                        return { ...row, ...updatedRow };
                    }
                    return row;
                });
                setRows(updatedRows);
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to update the report');
            });
    };
    
    

    const onDeleteRow = (reportId, oldRow, oldRows) => {
        console.log('Report ID to Delete:', reportId);
    
        axios
            .delete(`http://localhost:5000/reports/${reportId}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Report deleted successfully');
                    // Update the state by removing the deleted row
                    const updatedRows = oldRows.filter((r) => r.reportid !== reportId); // Correct reference to 'reportid'
                    setRows(updatedRows);
                } else {
                    throw new Error('Failed to delete the row');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to delete the report');
            });
    };
    
    
    const columns = [
        // {
        // field: "no",
        // headerName: "No",
        // width: 50,
        // align: "center",
        // type: "number",
        // editable: false
        // },
        {
        field: "reportid",
        headerName: "Id Report",
        width: 100,
        hide: true,
        align: "center",
        type: "number",
        editable: true
        },
        // {
        // field: "userid",
        // headerName: "Id User",
        // width: 100,
        // headerAlign: "center",
        // type: "number",
        // align: "center",
        // editable: true
        // },
        {
        field: "date",
        headerName: "Date",
        width: 150,
        headerAlign: "center",
        type: "date",
        align: "center",
        editable: false,
        valueGetter: (params) => new Date(params.row.date),
        },
        {
        field: "description",
        headerName: "Description",
        width: 250,
        headerAlign: "center",
        type: "string",
        editable: true
        },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            type:'action',
            headerAlign: "center",
            renderCell: (params) => {
                return(
                    <Button
                        color="primary"
                        onClick={() => handleOpenModal(params.row.reportid)} // Pass reportId to fetch the image
                    >
                        <FileOpenOutlinedIcon/>
                    </Button>
                )
            }
        },
        // {
        //     field: "image",
        //     headerName: "Image",
        //     width: 100,
        //     type:'action',
        //     headerAlign: "center",
        //     renderCell: (params) => {
        //         return(
        //             <Button
        //                 color="primary"
        //                 onClick={()=>handleOpenModal(params.row.image)}
        //             >
        //                 <FileOpenOutlinedIcon/>
        //             </Button>
        //         )
        //     }
        // },
        {
        field: "location",
        headerName: "Location",
        width: 250,
        headerAlign: "center",
        type: "string",
        editable: true
        },
        {
        field: "assignee",
        headerName: "Assignee",
        width: 100,
        headerAlign: "center",
        type: "string",
        editable: true
        },
        {
            field: "completeness",
            headerName: "Completeness",
            width: 130,
            headerAlign: "center",
            type: "number",
            renderCell: (params) => {
                const completeness = calculateCompleteness(params.row);
                return (
                    <div>
                        {completeness > 0.7 ? "complete" : "incomplete"}
                    </div>
                );
            }
        },
        {
            field: "status",
            headerName: "Status",
            width: 100,
            headerAlign: "center",
            type: "string",
            renderCell: (params) => {
            const completeness = calculateCompleteness(params.row);
            const statusText = completeness > 0.7 ? ("Good") : "Bad";
        
            return (
                <div style={{ color: statusText == 'Good' ? 'green' : 'red' }}>
                {statusText}
                </div>
            );
            },
        },
        // {
        // field: "priority",
        // headerName: "Priority",
        // width: 100,
        // headerAlign: "center",
        // type: "string",
        // editable: true
        // }
    ];

//   const createRowData = (rows) => {
//     const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
//     const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
//     return { id: newId, no: newNo };
//   };

    return (
        <div>
            
            <FullEditDataGrid
            columns={columns}
            rows={rows}
            onSaveRow={onSaveRow}
            // onDeleteRow={onDeleteRow}
            loading={loading}
            />
            {/* Show image */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh', // Set the height of the modal to the full viewport height
                        }}
                    >
                    <img
                        alt="profile-user"
                        width="auto"
                        height="90%"
                        src={`../../assets/20230502_101153AMByGPSMapCamera.jpg`}
                        style={{cursor: "pointer" }}
                    />
                        {/* <img src={modalImageURL} alt="Modal Image" /> */}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


export default ReportGrid;

