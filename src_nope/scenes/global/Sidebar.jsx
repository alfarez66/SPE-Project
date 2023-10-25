import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; 
import { Box,IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PeopleOutlinedIcon  from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon  from "@mui/icons-material/ReceiptOutlined";
import FeedIcon from '@mui/icons-material/Feed';
// import BarChartOutlinedIcon  from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined";
import { UploadFileOutlined } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    return(
        <MenuItem active={selected === title} style={{color: colors.grey[100]}} onClick={()=> setSelected(title)} icon={icon} >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}


const Sidebar = ({userRole}) => {
    const isMobile = useMediaQuery("(max-width:600px)")
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    
    const shouldCollapseSidebar = isMobile || isCollapsed;
    
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner":{
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper":{
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item":{
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover":{
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                },
            }} 
        >
            <ProSidebar collapsed={shouldCollapseSidebar} >
                <Menu iconShape="square">
                    {/* Logo and menu icon */}
                    <MenuItem
                        onClick={()=>setIsCollapsed(!isCollapsed)}
                        icon={shouldCollapseSidebar ? <MenuOutlinedIcon/> :undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!shouldCollapseSidebar && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMIN
                                </Typography>
                                <IconButton onClick={()=>setIsCollapsed(!shouldCollapseSidebar)}>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {!shouldCollapseSidebar && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center" >
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/kemhan.png`}
                                    style={{cursor: "pointer", borderRadius:"50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography 
                                variant="h2" 
                                color={colors.grey[100]} 
                                fontWeight="bold" 
                                sx={{ m: "10px 0 0 0"}} 
                                >
                                    [Admin Name]
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Admin role
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu items */}
                    <Box paddingLeft={shouldCollapseSidebar ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {userRole ==="Admin" &&(
                            <>
                                {/* Render Admin-specific items */}
                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Manage Team
                                </Typography>
                                <Item
                                    title="Team"
                                    to="/team"
                                    icon={<PeopleOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="Form"
                                    to="/form"
                                    icon={<FeedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    Manage work
                                </Typography>
                            </>
                        )}
                        <Item
                            title="Report"
                            to="/report"
                            icon={<ReceiptOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Upload"
                            to="/report/create"
                            icon={<UploadFileOutlined/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Monitoring"
                            to="/monitor"
                            icon={<MonitorHeartIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>

        </Box>
    )
}

export default Sidebar;