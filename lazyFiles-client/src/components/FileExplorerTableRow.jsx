import React from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import { Folder as FolderIcon, InsertDriveFile as FileIcon } from '@mui/icons-material';

export default function FileExplorerTableRow({ item, handleItemClick }) {
    const formatRelativeTime = (date) => {
        const now = new Date();
        const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 30) {
            return `${diffInDays} days ago`;
        } else {
            const months = Math.floor(diffInDays / 30);
            return `${months} month${months > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <TableRow
            hover
            onClick={() => handleItemClick(item)}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.type === 'folder' ? (
                        <FolderIcon sx={{ mr: 1, color: 'orange' }} />
                    ) : (
                        <FileIcon sx={{ mr: 1, color: 'primary.main' }} />
                    )}
                    {item.name}
                </Box>
            </TableCell>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{formatRelativeTime(item.lastModified)}</TableCell>
            <TableCell>{item.type === 'folder' ? '--' : item.size}</TableCell>
        </TableRow>
    );
}