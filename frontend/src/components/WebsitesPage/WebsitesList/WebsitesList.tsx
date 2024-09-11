import React from 'react';

import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/router';

import { POLLING_INTERVAL } from '@/constants/constants';
import { WebsiteStatusFilter } from '@/constants/enums';
import { validWebsiteStatusFilter } from '@/helpers/filterHelper';
import { useGetWebsitesQuery } from '@/queries/useGetWebsitesQuery';
import { CustomLoading } from '@/ui-kit/theme/components/CustomLoading/CustomLoading';
import { MobileFirstResponsiveTable } from '@/ui-kit/theme/components/MobileFirstResponsiveTable/MobileFirstResponsiveTable';

import { WebsiteListItem } from '../WebsiteListItem/WebsiteListItem';
import { ZeroWebsiteScreen } from '../ZeroWebsiteScreen/ZeroWebsiteScreen';

import type { WebsitesListProps } from './WebsitesList.props';
import { WebsitesListWrapper } from './WebsitesList.styles';

export const WebsitesList: React.FC<WebsitesListProps> = () => {
  const router = useRouter();

  const page = Math.max(1, Number(router.query.page) || 1);
  const rowsPerPage = Number(router.query.rowsPerPage) || 10;
  const searchText = (router.query.search as string) || '';
  const statusFilter = (router.query.filter as string) || WebsiteStatusFilter.all;

  const {
    data: getWebsitesData,
    isLoading: isGetWebsiteLoading,
    dataUpdatedAt: lastUpdated,
  } = useGetWebsitesQuery(
    {
      page,
      rowsPerPage,
      searchText,
      statusFilter: validWebsiteStatusFilter(statusFilter),
    },
    {
      refetchInterval: POLLING_INTERVAL,
      refetchIntervalInBackground: true,
      notifyOnChangeProps: ['data', 'isLoading', 'dataUpdatedAt'],
    },
  );

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

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return 'Long time ago';
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const websites = getWebsitesData?.data?.websites;

  const totalCount = getWebsitesData?.data?.totalCount;
  const rowsPerPageOptions = [5, 10, 15, 20];

  if (isGetWebsiteLoading) return <CustomLoading />;

  if (!websites || websites.length === 0) {
    return <ZeroWebsiteScreen />;
  }

  return (
    <WebsitesListWrapper>
      <Typography variant="body2" className="last-updated" color={'primary'}>
        Last Updated : {formatLastUpdated(new Date(lastUpdated))}
      </Typography>
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
              key={website.id}
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
    </WebsitesListWrapper>
  );
};

WebsitesList.displayName = 'WebsitesList';
