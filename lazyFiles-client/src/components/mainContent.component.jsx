import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import FileExplorerBreadcrumb from './FileExplorerBreadcrumb';
import FileExplorerTable from './FileExplorerTable';

export default function FileExplorer() {
    // Mock data for files and folders
    const initialData = [
        { id: 1, name: 'Documents', type: 'folder', owner: 'Me', lastModified: new Date('2025-04-15'), size: null },
        { id: 2, name: 'Images', type: 'folder', owner: 'Alex', lastModified: new Date('2025-04-10'), size: null },
        { id: 3, name: 'report.pdf', type: 'file', owner: 'Me', lastModified: new Date('2025-04-18'), size: '2.5 MB' },
        { id: 4, name: 'presentation.pptx', type: 'file', owner: 'Sarah', lastModified: new Date('2025-04-05'), size: '5.7 MB' },
        { id: 5, name: 'data.xlsx', type: 'file', owner: 'Me', lastModified: new Date('2025-04-19'), size: '1.2 MB' },
    ];

    // State variables
    const [data, setData] = useState(initialData);
    const [currentPath, setCurrentPath] = useState(['Home']);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Handle sorting
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Apply sorting to data
    useEffect(() => {
        const sortedData = [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
    }, [sortConfig]);

    // Handle navigation
    const handlePathClick = (index) => {
        setCurrentPath(currentPath.slice(0, index + 1));
        // In a real application, you would fetch data for the new path here
    };

    const handleItemClick = (item) => {
        if (item.type === 'folder') {
            setCurrentPath([...currentPath, item.name]);
            // In a real application, you would fetch data for the new folder here
        } else {
            // Handle file click (open file, download, etc.)
            console.log('File clicked:', item.name);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <FileExplorerBreadcrumb
                currentPath={currentPath}
                handlePathClick={handlePathClick}
            />

            <Paper elevation={2} sx={{ mt: 2 }}>
                <FileExplorerTable
                    data={data}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    handleItemClick={handleItemClick}
                />
            </Paper>
        </Box>
    );
}