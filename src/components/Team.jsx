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
    

    // Update user based on email
    const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
        const userEmail = oldRow.email; // Get the email of the user being edited
        axios
            .put(`http://localhost:5000/users/${userEmail}`, updatedRow) // Use the email as the identifier
            .then((response) => {
                // Handle the response accordingly
                // Update the user in the frontend, if required
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to update the user');
            });
    };

// Delete user based on email
const onDeleteRow = async (id, updatedRow, oldRow, oldRows) => {
    console.log('Old Row:', oldRow); // Add this line for debugging
    try {
      if (oldRow && oldRow.email) {
        const userEmail = oldRow.email;
  
        // Check if the email exists in the database
        const response = await axios.get(`http://localhost:5000/user/${userEmail}`);
        if (response.status !== 200) {
          // The email does not exist
          alert('Email not found or invalid');
          return;
        }
  
        // Delete the user
        const deleteResponse = await axios.delete(`http://localhost:5000/user/${userEmail}`);
        if (deleteResponse.status === 200) {
          // The user was deleted successfully
          const updatedRows = oldRows.filter((row) => row.id !== id);
          setRows(updatedRows); // Assuming you have a state for rows
        } else {
          // The user could not be deleted
          alert('Failed to delete user');
        }
      } else {
        alert('Email not found or invalid');
      }
    } catch (error) {
      // Catch the error and prevent it from being thrown
      console.error(error);
      // Do something else, like show a toast notification to the user
    }
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

