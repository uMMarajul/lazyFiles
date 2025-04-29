import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

export default function FileExplorerBreadcrumb({ currentPath, handlePathClick }) {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            {currentPath.map((path, index) => {
                const isLast = index === currentPath.length - 1;

                return isLast ? (
                    <Typography key={index} color="text.primary">
                        {path}
                    </Typography>
                ) : (
                    <Link
                        key={index}
                        color="inherit"
                        onClick={() => handlePathClick(index)}
                        sx={{ cursor: 'pointer' }}
                        underline="hover"
                    >
                        {path}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}