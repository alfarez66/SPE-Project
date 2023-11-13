import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PersonIcon from '@mui/icons-material/Person';
import ProgressCircle from "../../components/ProgressCircle";
import axios from "../../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import averagedData from "../../data/realData";


const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [completenessScore, setScore] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [userGainThisMonth, setUserGainThisMonth] = useState('');
    const [reportSent, setReportSent] = useState(0);
    const [reportSentThisMonth, setReportSentThisMonth] = useState('');
    const [lineData, setLineData] = useState([]); // Define lineData state

    const [userData, setUserData] = useState({
        labels: averagedData.map((data) => data.month),
        datasets: [
        {
            label: "Completeness Score",
            data: averagedData.map((data) => data.averageScore),
            backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
        },
        ],
    });

    useEffect(() => {
        // Fetch data from backend endpoints

        
        const overallScore = averagedData.reduce(
            (totalScore, monthData) => totalScore + monthData.averageScore,
            0
        );
        const totalMonths = averagedData.length;
        const overallAverageScore = overallScore / totalMonths;
        setScore(overallAverageScore);

        axios.get('/completeness_scores')
            .then(response => {
                setLineData(response.data); // Update lineData state with the fetched data
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/users/count')
            .then(response => {
                setUserCount(response.data.usersCount);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/users/newThisMonth')
            .then(response => {
                setUserGainThisMonth(response.data.newUsersThisMonth);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/reports/count')
            .then(response => {
                setReportSent(response.data.reportsCount);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/reports/newThisMonth')
            .then(response => {
                setReportSentThisMonth(response.data.newReportsThisMonth);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
            {/* <Button
                sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                }}
            >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download Reports
            </Button> */}
            </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
        >
            {/* ROW 1 */}
            <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title={reportSent}
                subtitle="Reports Sent This Month"
                progress="0.75"
                increase={`+${reportSentThisMonth}`}
                icon={
                <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                }
            />
            </Box>
            <Box
            gridColumn="span 6"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
            <StatBox
                title={userCount}
                subtitle="User Gain This Month"
                progress="0.50"
                increase={`+${userGainThisMonth}`}
                icon={
                <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
                }
            />
            </Box>

            {/* ROW 2 */}
            <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            >
            <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                >
                    Overal score
                </Typography>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                >
                    {`${(completenessScore*100).toFixed(2)}%`}
                </Typography>
                </Box>
                <Box>
                <IconButton>
                    <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                </IconButton>
                </Box>
            </Box>
            <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]} className="LineChartContainer">
                <Box height="250px">
                    <LineChart chartData={userData} />
                </Box>
            </Box>
            </Box>
            {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Recent Transactions
                </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
                <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
                >
                <Box>
                    <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    >
                    {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                    {transaction.user}
                    </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                >
                    ${transaction.cost}
                </Box>
                </Box>
            ))}
            </Box> */}

            {/* ROW 3 */}
            {/* <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
            >
            <Typography variant="h5" fontWeight="600">
                Campaign
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
            >
                <ProgressCircle size="125" />
                <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
                >
                $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
            </Box> */}
            {/* <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            >
            <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
            >
                Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
            </Box>
            </Box> */}
        </Box>
        </Box>
    );
};

export default Dashboard;
