import React, { useEffect, useState } from 'react';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';

import { useRouter } from 'next/router';

import { WebsiteStatusFilter } from '@/constants/enums';
import { validWebsiteStatusFilter } from '@/helpers/filterHelper';

import { WebsiteFilter } from '../WebsiteFilter/WebsiteFilter';

import type { WebsiteSearchProps } from './WebsiteSearch.props';
import { ButtonContainer, SearchContainer, SearchWrapper } from './WebsiteSearch.styles';

export const WebsiteSearch: React.FC<WebsiteSearchProps> = props => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<WebsiteStatusFilter>(WebsiteStatusFilter.all);

  useEffect(() => {
    const { search, filter } = router.query;
    if (typeof search === 'string') {
      setSearchText(search);
    }

    const validFilter = validWebsiteStatusFilter(filter as string);
    setStatusFilter(validFilter);
  }, [router.query]);

  const handleSearch = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: searchText, filter: statusFilter, page: 1 },
    });
  };

  const handleFilterChange = (filter: WebsiteStatusFilter) => {
    setStatusFilter(filter);
  };

  const handleReset = () => {
    setSearchText('');
    setStatusFilter(WebsiteStatusFilter.all);
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  };

  return (
    <SearchWrapper>
      <SearchContainer>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search websites..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <WebsiteFilter value={statusFilter} onChange={handleFilterChange} />
        <ButtonContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        </ButtonContainer>
      </SearchContainer>
    </SearchWrapper>
  );
};

WebsiteSearch.displayName = 'WebsiteSearch';
