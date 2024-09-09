import React from 'react';

import { MobileFirstResponsiveTable } from '@/ui-kit/theme/components/MobileFirstResponsiveTable/MobileFirstResponsiveTable';
import { MobileFirstResponsiveTableContainer } from '@/ui-kit/theme/components/MobileFirstResponsiveTableContainer/MobileFirstResponsiveTableContainer';
import { StatusChip } from '@/ui-kit/theme/components/StatusChip/StatusChip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import type { WebsitesListProps } from './WebsitesList.props';
import { WebsitesListWrapper } from './WebsitesList.styles';

export interface Website {
  id: number;
  name: string;
  url: string;
  status: 'Online' | 'Offline';
}

const dummyWebsites: Website[] = [
  { id: 1, name: 'Example Site', url: 'https://example.com', status: 'Online' },
  { id: 2, name: 'Test Site', url: 'https://test.com', status: 'Offline' },
  { id: 3, name: 'Another Site', url: 'https://another.com', status: 'Online' },
];

export const WebsitesList: React.FC<WebsitesListProps> = props => {
  const handleEdit = (id: number) => {
    console.log(`Edit website with id: ${id}`);
    // TODO: Implement edit logic
  };

  const handleDelete = (id: number) => {
    console.log(`Delete website with id: ${id}`);
    // TODO: Implement delete logic
  };

  return (
    <WebsitesListWrapper>
      <MobileFirstResponsiveTableContainer>
        <MobileFirstResponsiveTable className="mobile-optimised" aria-label="website table">
          <TableHead>
            <TableRow>
              <TableCell>Website Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyWebsites.map(website => (
              <TableRow key={website.id}>
                <TableCell data-th="Website Name" component="td" scope="row">
                  {website.name}
                </TableCell>
                <TableCell data-th="URL">{website.url}</TableCell>
                <TableCell data-th="Status">
                  <StatusChip status={website.status}>{website.status}</StatusChip>
                </TableCell>
                <TableCell data-th="Actions">
                  <IconButton onClick={() => handleEdit(website.id)} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(website.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MobileFirstResponsiveTable>
      </MobileFirstResponsiveTableContainer>
    </WebsitesListWrapper>
  );
};

WebsitesList.displayName = 'WebsitesList';
