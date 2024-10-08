import React, { useEffect, useState } from 'react';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';

import { useRouter } from 'next/router';

import { WebsiteStatusFilter } from '@/constants/enums';
import { validWebsiteStatusFilter } from '@/helpers/filterHelper';

import { WebsiteFilter } from '../WebsiteFilter/WebsiteFilter';

import type { WebsiteSearchProps } from './WebsiteSearch.props';
import { ButtonContainer, WebsiteSearchWrapper } from './WebsiteSearch.styles';

export const WebsiteSearch: React.FC<WebsiteSearchProps> = () => {
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

  const handleSearch = (searchValue: string) => {
    const trimedSearchText = searchValue.trim();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: trimedSearchText, filter: statusFilter, page: 1 },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchText);
    }
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

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { search: previousSearchText } = router.query;
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    //if already search results are there and user clear the search bar , default results are displayed
    if (
      newSearchText === '' &&
      typeof previousSearchText === 'string' &&
      previousSearchText !== ''
    ) {
      handleSearch(newSearchText);
    }
  };

  return (
    <WebsiteSearchWrapper>
      <TextField
        variant="outlined"
        size="small"
        name="search"
        id="search"
        placeholder="Search Websites by Names..."
        value={searchText}
        onChange={handleSearchTextChange}
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      <WebsiteFilter value={statusFilter} onChange={handleFilterChange} />
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch(searchText)}
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
    </WebsiteSearchWrapper>
  );
};

WebsiteSearch.displayName = 'WebsiteSearch';
