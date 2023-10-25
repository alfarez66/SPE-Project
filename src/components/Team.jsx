/* 
This file is 
to customize the ui of the grid and 
to integrate with a communication with backend.  
 */

import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import axios from "axios";


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
    field: "name",
    headerName: "Name",
    width: 150,
    align: "center",
    type: "string",
    editable: true,
    },
    {
    field: "contact",
    headerName: "Phone",
    width: 150,
    align: "center",
    type: "string",
    editable: true,
    },
    {
    field: "email",
    headerName: "Email",
    width: 100,
    align: "center",
    type: "string",
    editable: true,
    },
    {
    field: "access",
    headerName: "Access",
    width: 100,
    align: "center",
    type: "string",
    editable: true,
    },
];





function TeamGrid() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // const setRows = (rows) => {
    //     return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
    // };

    useEffect(() => {
        setLoading(true);
    
        axios
            .get('http://localhost:5000/users') // Use the correct endpoint
            .then((response) => {
                const rows = response.data.rows.map((row, i) => ({
                    ...row,
                    id: i + 1,
                    no: i + 1,
                }));
                
                // set the rows
                setRows(rows);
            })
            .catch((error) => {
                console.log(error);
                // handle error
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    

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
    );
}


export default TeamGrid;

