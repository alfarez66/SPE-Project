import { Box } from "@mui/material";
import Header from "../../components/header"

const Dashboard = () => {
    return <Box m="20px" >
        <Box display="flex" justifyContent="space-between" alignItems="center" >
            <Header title="Dashboard" subtitle="Welcome to dashboard" />
        </Box>
    </Box>
}

export default Dashboard;