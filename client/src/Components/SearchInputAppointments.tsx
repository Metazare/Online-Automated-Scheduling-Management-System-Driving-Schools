import React, { useState } from 'react';
import { Paper, Button, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  data: any[];
  setFilteredData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  filteredData: any[];
};

function SearchInput({ data, setFilteredData, filteredData }: Props) {
  const [searchValue, setSearchValue] = useState<string>('');
  console.log("data")
  console.log(data)
  const handleSearch = () => {
    if(searchValue === ''){
      setFilteredData(undefined);
    }else{
      const filtered = data.filter((item) =>
        item.enrollment.student.name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.enrollment.student.name.last.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.enrollment.student.name.middle.toLowerCase().includes(searchValue.toLowerCase()) 
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
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 0 0 .5em',
          width: '50%',
          minWidth: '300px',
          margin: 'auto',
        }}
      >
        <SearchIcon />
        <input
          type="text"
          style={{ flexGrow: '1', border: 'none', outline: 'none', height: '100%' }}
          onChange={(event) => {
            if(event.target.value === ""){
              setFilteredData(undefined);
              setSearchValue(event.target.value)
            }else{
              handleSearch()
              setSearchValue(event.target.value);
            }
          }}
          value={searchValue}
          
        />
        <IconButton aria-label="" onClick={()=>{
          setFilteredData(undefined)
          setSearchValue("")}}
          >
            <ClearIcon/>
        </IconButton>
      </Paper>

      
    </>
  );
}

export default SearchInput;
