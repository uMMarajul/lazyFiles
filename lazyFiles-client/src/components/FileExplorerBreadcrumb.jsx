import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
    const navigate = useNavigate();

    // Split pathname into parts and filter out empty segments
    const pathnames = ["home"];

    const handleClick = (to) => {
        navigate(to);
    };

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link
                underline="hover"
                color="inherit"
                onClick={() => handleClick("/")}
                sx={{ cursor: "pointer" }}
            >
                Home
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={to}>
                        {decodeURIComponent(value)}
                    </Typography>
                ) : (
                    <Link
                        key={to}
                        underline="hover"
                        color="inherit"
                        onClick={() => handleClick(to)}
                        sx={{ cursor: "pointer" }}
                    >
                        {decodeURIComponent(value)}
                    </Link>
                );
            })}


        </Breadcrumbs>
    );
};

export default BreadcrumbNav;
