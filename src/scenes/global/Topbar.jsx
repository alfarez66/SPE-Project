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

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    return (<Box display="flex" justifyContent="space-between" p={2}>
        {/* Search Bar */}
        <Box 
        display="flex" 
        backgroundColor={colors.primary[400]} 
        borderRadius="3px" 
        >
            <InputBase sx={{ml:2, flex:1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p:1 }} >
                <SearchIcon />
            </IconButton>
        </Box>
        {/* ICON SECTION */}
        <Box display="flex">
            <Button
                sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                }}
                onClick={() => {
                    window.location.href = "/login";
                }}
                >
                <Typography component="h1" color={colors.grey[100]}>
                    Login
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