import React from 'react';

import { TableCell, Typography } from '@mui/material';

import Link from 'next/link';

import { StatusChip } from '@/ui-kit/theme/components/StatusChip/StatusChip';

import { RemoveWebsiteButton } from '../RemoveWebsiteButton/RemoveWebsiteButton';

import type { WebsiteListItemProps } from './WebsiteListItem.props';
import { StyledTableRow } from './WebsiteListItem.styles';

export const WebsiteListItem: React.FC<WebsiteListItemProps> = props => {
  const { id, name, status, url } = props;

  return (
    <StyledTableRow>
      <TableCell className="capitalize" data-th="Website Name" component="td" scope="row">
        <Typography fontSize={16}>{name}</Typography>
      </TableCell>
      <TableCell data-th="URL">
        <Link target="_blank" href={url}>
          {url}
        </Link>
      </TableCell>
      <TableCell data-th="Status">
        <StatusChip status={status}>{status}</StatusChip>
      </TableCell>
      <TableCell data-th="Actions">
        <RemoveWebsiteButton websiteListItemId={id} />
      </TableCell>
    </StyledTableRow>
  );
};

WebsiteListItem.displayName = 'WebsiteListItem';
