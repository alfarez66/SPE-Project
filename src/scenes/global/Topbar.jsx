import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext,tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon  from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon  from "@mui/icons-material/PersonOutlined";
import SearchIcon  from "@mui/icons-material/Search";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

    const [ authenticated, setAuthenticated] = useState(!!cookies.jwt)
    // console.log(cookies.get("jwt"))
    

    useEffect(()=>{
        setAuthenticated(!!cookies.jwt)
    },[cookies])

    const handleLoginClick = () => {
        if(authenticated){
            removeCookie('jwt')
            setAuthenticated(false);
            navigate("/")
            window.location.reload()
        }else {
            navigate("/login");
        }
    }

    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* Search Bar */}
        <Box 
        display="flex" 
        backgroundColor={colors.primary[400]} 
        borderRadius="3px" 
        >
            {/* <InputBase sx={{ml:2, flex:1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p:1 }} >
                <SearchIcon />
            </IconButton> */}
        </Box>
        {/* ICON SECTION */}
        <Box display="flex">
            <Button
                sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                }}
                onClick={handleLoginClick}
                >
                <Typography component="h1" color={colors.grey[100]}>
                    {authenticated ? "Logout":"Login"}
                </Typography>
            </Button>

            <IconButton onClick={colorMode.toggleColorMode} >
                {theme.palette.mode ==='dark' ?(
                    <DarkModeOutlinedIcon />
                ):(
                <LightModeOutlinedIcon />
                )}
            </IconButton>
            {/* <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton> */}
            {/* <IconButton>
                <PersonOutlinedIcon />
            </IconButton> */}
        </Box>
    </Box>
    )
}

export default Topbar;