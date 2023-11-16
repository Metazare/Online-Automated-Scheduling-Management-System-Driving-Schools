import React, { useState } from 'react';
import { Paper, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  data: any[];
  setFilteredData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  filteredData: any[];
};

function SearchInput({ data, setFilteredData, filteredData }: Props) {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = () => {
    
    if(searchValue === ''){
      setFilteredData(undefined);
    }else{
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered.length > 0 ? filtered : []);
    }
    
  };

  return (
    <>
      <Paper
        variant="elevation"
        elevation={3}
        sx={{
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 0 0 .5em',
          width: '50%',
          minWidth: '300px',
          margin: 'auto',
          transform: 'translateY(15px)',
        }}
      >
        <SearchIcon />
        <input
          type="text"
          style={{ flexGrow: '1', border: 'none', outline: 'none', height: '100%' }}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          value={searchValue}
          onFocus={() => {
            setFilteredData(undefined);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: '20px' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Paper>

      
    </>
  );
}

export default SearchInput;
