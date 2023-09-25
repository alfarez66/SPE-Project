import { PieChart } from "@mui/icons-material"
import Header from "../../components/header"
import { Box } from "@mui/material"



const Pie = () =>{
    return(
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart"  />
            <Box height="75vh" >
                <PieChart/>
            </Box>
        </Box>
    )
}

export default Pie