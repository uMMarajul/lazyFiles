import {Box, Toolbar} from "@mui/material";
import Navbar from "../components/navbar.component.jsx";
import Sidebar from "../components/sidebar.component";
import MainSectionLayout from "../components/mainContent.component";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, clearUser } from '../store/userSlice';


export function Dashboard({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    },[dispatch])

    return (
        <>
            <Navbar onMenuClick={handleDrawerToggle} />

            <Box sx={{ display: "flex" }}>
                <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: "64px", // navbar height
                        p: 2,
                    }}
                >
                    <Toolbar />
                    <MainSectionLayout />
                </Box>
            </Box>

        </>
    );
}