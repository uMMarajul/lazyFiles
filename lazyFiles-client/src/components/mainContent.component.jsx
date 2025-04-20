

import React from "react";
import { Box, Container } from "@mui/material";
import BreadcrumbNav from "./breadcrumb.component.jsx";
// import FileTable from "./FileTable";

const MainSectionLayout = () => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                minHeight: "calc(100vh - 64px)",
                overflowX: "hidden",
            }}
        >
            <Container maxWidth="lg">
                <BreadcrumbNav />
                <Box mt={3}>
                    {/*<FileTable />*/}
                </Box>
            </Container>
        </Box>
    );
};

export default MainSectionLayout;
