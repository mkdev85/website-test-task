import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';

import { useRouter } from 'next/router';

import { WebsiteStatusFilter } from '@/constants/enums';
import { validWebsiteStatusFilter } from '@/helpers/filterHelper';
import { useGetWebsitesQuery } from '@/queries/useGetWebsitesQuery';
import { CustomLoading } from '@/ui-kit/theme/components/CustomLoading/CustomLoading';
import { MobileFirstResponsiveTable } from '@/ui-kit/theme/components/MobileFirstResponsiveTable/MobileFirstResponsiveTable';
import { MobileFirstResponsiveTableContainer } from '@/ui-kit/theme/components/MobileFirstResponsiveTableContainer/MobileFirstResponsiveTableContainer';
import { StatusChip } from '@/ui-kit/theme/components/StatusChip/StatusChip';

import { WebsiteSearch } from '../WebsiteSearch/WebsiteSearch';

import type { WebsitesListProps } from './WebsitesList.props';
import { WebsitesListWrapper } from './WebsitesList.styles';

export const WebsitesList: React.FC<WebsitesListProps> = props => {
  const router = useRouter();
  const page = Math.max(1, Number(router.query.page) || 1);
  const rowsPerPage = Number(router.query.rowsPerPage) || 10;
  const searchText = (router.query.search as string) || '';
  const statusFilter = (router.query.filter as string) || WebsiteStatusFilter.all;

  const rowsPerPageOptions = [10, 15, 20];

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetWebsitesQuery({
    page,
    rowsPerPage,
    searchText,
    statusFilter: validWebsiteStatusFilter(statusFilter),
  });

  const websites = responseData?.data?.websites;
  const totalCount = responseData?.data?.totalCount;

  const handleChangePage = (event: unknown, newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage + 1 },
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, rowsPerPage: newRowsPerPage },
    });
  };

  const handleDelete = (id: string) => {
    console.log(`Delete website with id: ${id}`);
    // TODO: Implement delete logic
  };

  if (isLoading) return <CustomLoading />;

  return (
    <WebsitesListWrapper>
      <WebsiteSearch />
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
            {websites?.map(website => (
              <TableRow key={website.id}>
                <TableCell data-th="Website Name" component="td" scope="row">
                  {website.name}
                </TableCell>
                <TableCell data-th="URL">{website.url}</TableCell>
                <TableCell data-th="Status">
                  <StatusChip status={website.status}>{website.status}</StatusChip>
                </TableCell>
                <TableCell data-th="Actions">
                  <Button
                    onClick={() => handleDelete(website.id)}
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MobileFirstResponsiveTable>
      </MobileFirstResponsiveTableContainer>
      <TablePagination
        component="div"
        count={totalCount || 0}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </WebsitesListWrapper>
  );
};

WebsitesList.displayName = 'WebsitesList';
