import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { WebsiteStatusFilter } from '@/constants/enums';

import type { WebsiteFilterProps } from './WebsiteFilter.props';
import { WebsiteFilterWrapper } from './WebsiteFilter.styles';

export const WebsiteFilter: React.FC<WebsiteFilterProps> = props => {
  const { value, onChange } = props;

  return (
    <WebsiteFilterWrapper>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={value}
          onChange={e => onChange(e.target.value as WebsiteStatusFilter)}
          label="Status"
        >
          <MenuItem value={WebsiteStatusFilter.all}>All</MenuItem>
          <MenuItem value={WebsiteStatusFilter.online}>Online</MenuItem>
          <MenuItem value={WebsiteStatusFilter.offline}>Offline</MenuItem>
        </Select>
      </FormControl>
    </WebsiteFilterWrapper>
  );
};

WebsiteFilter.displayName = 'WebsiteFilter';
