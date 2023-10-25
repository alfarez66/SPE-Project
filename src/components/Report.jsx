
import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid"
import { Box, Button, Modal, Typography } from "@mui/joy";
import { Avatar, IconButton } from "@mui/material";
import imagesActions from "./ReportAction";

function imageDataToUrl(imageData){
    if (imageData === null){
        return null;
    }
    const buffer = new Uint8Array(imageData.data)
    const textDecoder = new TextDecoder('utf-8')
    const base64Image = btoa(textDecoder.decode(buffer))
    return `data:${imageData.type};base64,${base64Image}`
}
// function ImageCell({ params }) {
//     const [open, setOpen] = useState(false);
  
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
  
//     const imageData = params.row.image;
//     const imageUrl = imageDataToUrl(imageData);
  
//     if (imageUrl !== null) {
//       return (
//         <div>
//           <img
//             src={imageUrl}
//             alt="Image"
//             style={{ width: "100px", height: "auto" }}
//             onClick={handleOpen}
//           />
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="simple-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <div>
//               <Typography id="modal-modal-title" variant="h6" component="h2">
//                 Text in modal
//               </Typography>
//               <Typography id="modal-modal-description" style={{ mt: 2 }}>
//                 Description in modal
//               </Typography>
//             </div>
//           </Modal>
//         </div>
//       );
//     } else {
//       return null;
//     }
//   }

const columns = [
    {
    field: "no",
    headerName: "No",
    width: 50,
    align: "center",
    type: "number",
    editable: false
    },
    {
    field: "reportid",
    headerName: "Report Id",
    width: 50,
    hide: true,
    align: "center",
    type: "number",
    editable: true
    },
    {
    field: "userid",
    headerName: "User Id",
    width: 100,
    headerAlign: "center",
    type: "number",
    align: "center",
    editable: true
    },
    {
    field: "date",
    headerName: "Date",
    width: 150,
    headerAlign: "center",
    type: "date",
    align: "center",
    editable: true,
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
    field: "status",
    headerName: "Status",
    width: 100,
    headerAlign: "center",
    type: "string",
    editable: true
    },
    // {
    //     field: "image",
    //     headerName: "Image",
    //     width: 70,
    //     headerAlign: "center",
    //     renderCell: (params) => {<Avatar src={params.row.image} /> }
    // },
    {
        field: "image",
        headerName: "Image",
        width: 70,
        type:'action',
        headerAlign: "center",
        renderCell: (params) => (
        <imagesActions {...{params}} /> 
        )
    },
    {
    field: "location",
    headerName: "Location",
    width: 100,
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
    // {
    // field: "priority",
    // headerName: "Priority",
    // width: 100,
    // headerAlign: "center",
    // type: "string",
    // editable: true
    // }
];




function ReportGrid() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // const setRows = (rows) => {
    //     return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    // };

    useEffect(()=>{
        setLoading(true);

        axios
        // .get('https://api.mockfly.dev/mocks/32354298-3386-43ac-991f-7720be8fd96f/report')
        .get('http://localhost:5000/reports')
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

    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        fetch('http://localhost:3001/updateReport',{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reportId: id,
                ...updatedRow,
            }),
        })
        .then((response)=>response.json())
        .then((data) =>{
            // update the state of the component and compare the changes.
            setRows(oldRows.map((r) => (r.reportId === id ? {...data} : r )))
        })
        .catch((err) => {
            console.log(err)
            alert('Failed to update the row')
        })
    };

    const onDeleteRow = (reportId, oldRow, oldRows) => {
        // delete request

        fetch(`http:localhost:3001/deleteReport/${reportId}`,{
            method: 'DELETE',
        })
        .then((response)=>{
            //update the state of component in data grid
            setRows(oldRows.filter((r) => r.reportId !== reportId))
        })
        .catch((err)=>{
            //handling error
            console.log(err)
            alert('Failed to delete the row')
        })
        // sellerController
        // .deleteRow(id)
        // .then((res) => {
        //     const dbRowId = res.data.id;
        //     setRows(oldRows.filter((r) => r.id !== dbRowId));
        // })
        // .catch((err) => {
        //     setRows(oldRows);
        // });
    };

//   const createRowData = (rows) => {
//     const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
//     const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
//     return { id: newId, no: newNo };
//   };

    return (
        <FullEditDataGrid
        columns={columns}
        rows={rows}
        onSaveRow={onSaveRow}
        onDeleteRow={onDeleteRow}
        loading={loading}
        />
        // <DataGrid
        //     columns={columns}
        //     rows = {rows}
        //     // pageSize={5}
        //     rowsPerPageOptions={[5]}
        // />
    );
}


export default ReportGrid;

