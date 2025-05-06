import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Box,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FolderIcon from "@mui/icons-material/Folder";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";

const Navbar = ({onMenuClick}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const userState = useSelector((state) => state.user);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="fixed" color="default" elevation={2}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box display="flex" alignItems="center" gap={1}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                            <MenuIcon/>
                        </IconButton>
                    )}
                    <img
                        src="/logo.png"
                        alt="logo"
                        width={45}
                        height={30}
                        style={{marginRight: 3}}
                    />
                    <Typography variant="h6" fontWeight="bold">
                        lazyFiles
                    </Typography>
                </Box>




                <IconButton onClick={handleAvatarClick}>


                    <Avatar src={userState.user?.profilePicture}/>

                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
