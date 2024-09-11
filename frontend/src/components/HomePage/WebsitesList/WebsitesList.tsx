import React from 'react';

import { TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';

import { useRouter } from 'next/router';

import { WebsiteStatusFilter } from '@/constants/enums';
import { validWebsiteStatusFilter } from '@/helpers/filterHelper';
import { useGetWebsitesQuery } from '@/queries/useGetWebsitesQuery';
import { CustomLoading } from '@/ui-kit/theme/components/CustomLoading/CustomLoading';
import { MobileFirstResponsiveTable } from '@/ui-kit/theme/components/MobileFirstResponsiveTable/MobileFirstResponsiveTable';
import { MobileFirstResponsiveTableContainer } from '@/ui-kit/theme/components/MobileFirstResponsiveTableContainer/MobileFirstResponsiveTableContainer';

import { WebsiteListItem } from '../WebsiteListItem/WebsiteListItem';
import { WebsiteSearch } from '../WebsiteSearch/WebsiteSearch';

import type { WebsitesListProps } from './WebsitesList.props';
import { WebsitesListWrapper } from './WebsitesList.styles';

export const WebsitesList: React.FC<WebsitesListProps> = props => {
  const router = useRouter();
  const page = Math.max(1, Number(router.query.page) || 1);
  const rowsPerPage = Number(router.query.rowsPerPage) || 10;
  const searchText = (router.query.search as string) || '';
  const statusFilter = (router.query.filter as string) || WebsiteStatusFilter.all;

  const rowsPerPageOptions = [5, 10, 15, 20];

  const {
    data: getWebsitesData,
    isLoading: isGetWebsiteLoading,
    isError: isGetWebsiteError,
  } = useGetWebsitesQuery({
    page,
    rowsPerPage,
    searchText,
    statusFilter: validWebsiteStatusFilter(statusFilter),
  });

  const websites = getWebsitesData?.data?.websites;
  const totalCount = getWebsitesData?.data?.totalCount;

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

  if (isGetWebsiteLoading) return <CustomLoading />;

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
              <WebsiteListItem
                id={website.id}
                name={website.name}
                status={website.status}
                url={website.url}
              />
            ))}
          </TableBody>
        </MobileFirstResponsiveTable>
        <TablePagination
          component="div"
          count={totalCount || 0}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MobileFirstResponsiveTableContainer>
    </WebsitesListWrapper>
  );
};

WebsitesList.displayName = 'WebsitesList';
