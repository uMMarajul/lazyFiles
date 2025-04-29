import React from 'react';
import { TableCell, Box, Typography, IconButton } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

export default function FileExplorerTableHeader({ column, label, sortConfig, requestSort }) {
    const getSortDirectionIcon = () => {
        if (sortConfig.key !== column) return null;
        return sortConfig.direction === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" />
        ) : (
            <ArrowDownwardIcon fontSize="small" />
        );
    };

    return (
        <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    {label}
                </Typography>
                <IconButton size="small" onClick={() => requestSort(column)}>
                    {getSortDirectionIcon()}
                </IconButton>
            </Box>
        </TableCell>
    );
}