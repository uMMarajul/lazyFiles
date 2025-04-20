import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    useMediaQuery,
    Divider,
    Typography,
    LinearProgress
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, onClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    const drawerContent = (
        <Box sx={{ pt: 2 }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
                        <ListItemText primary="Create New Folder" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><CloudUploadIcon /></ListItemIcon>
                        <ListItemText primary="Upload Files" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary="All Files" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><DeleteIcon /></ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon><CloudCircleIcon /></ListItemIcon>
                        <ListItemText primary="Storage" />
                    </ListItemButton>
                </ListItem>


                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Storage used
                    </Typography>
                    <Typography variant="caption">
                        10 GB of 15 GB
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(10 / 15) * 100}
                        sx={{
                            mt: 0.5,
                            height: 8,
                            borderRadius: 5,
                            width: '80%',
                            mx: 'auto'
                        }}
                    />
                </Box>


            </List>
        </Box>
    );

    return isMobile ? (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                },
            }}
        >
            {drawerContent}
        </Drawer>
    ) : (
        <Box
            component="nav"
            sx={{
                width: "100%",
                maxWidth: drawerWidth,
                mt: "64px", // height of the topbar
                borderRight: "1px solid #eee",
                height: "calc(100vh - 64px)",
                position: "relative",
            }}
        >
            {drawerContent}
        </Box>
    );
};

export default Sidebar;
