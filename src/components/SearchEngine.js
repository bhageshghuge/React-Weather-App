import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

function SearchEngine({ query, setQuery, search }) {
  return (
    <Box component="form" onSubmit={search} sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(144, 202, 249, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
        }}
      />
      <Button 
        variant="contained" 
        onClick={search}
        sx={{
          backgroundColor: '#90caf9',
          '&:hover': {
            backgroundColor: '#5d99c6',
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}

export default SearchEngine;
