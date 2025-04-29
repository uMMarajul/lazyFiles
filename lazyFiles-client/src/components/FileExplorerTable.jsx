import React from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import FileExplorerTableHeader from './FileExplorerTableHeader';
import FileExplorerTableRow from './FileExplorerTableRow';

export default function FileExplorerTable({ data, sortConfig, requestSort, handleItemClick }) {
    return (
        <TableContainer>
            <Table aria-label="file explorer table">
                <TableHead>
                    <TableRow>
                        <FileExplorerTableHeader
                            column="name"
                            label="Name"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <FileExplorerTableHeader
                            column="owner"
                            label="Owner"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <FileExplorerTableHeader
                            column="lastModified"
                            label="Last Modified"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <FileExplorerTableHeader
                            column="size"
                            label="File Size"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <FileExplorerTableRow
                            key={item.id}
                            item={item}
                            handleItemClick={handleItemClick}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}