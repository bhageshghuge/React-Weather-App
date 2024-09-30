import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#303030',
      paper: 'rgba(66, 66, 66, 0.7)',
    },
  },
});

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: null,
    error: null,  // Change this to null instead of false
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
      }`;
    return date;
  };

  const search = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!query.trim()) {
      setWeather({ loading: false, data: null, error: "Please enter a city name" });
      return;
    }
    setWeather({ loading: true, data: null, error: null });
    try {
      const { data } = await axios.get(
        `https://api.shecodes.io/weather/v1/current?query=${query}&key=b03a640e5ef6980o4da35b006t5f2942`);
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      setWeather({ loading: false, data, error: null });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather({ 
        loading: false, 
        data: null, 
        error: error.response?.data?.message || error.message || "An error occurred while fetching weather data"
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 500, color: '#90caf9' }}>
              Weather App
            </Typography>

            <SearchEngine query={query} setQuery={setQuery} search={search} />

            {weather.loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress size={60} thickness={4} />
              </Box>
            )}

            {weather.error && (
              <Alert severity="error" sx={{ my: 2 }}>
                {weather.error}
              </Alert>
            )}

            {weather.data && (
              <Forecast weather={weather.data} toDate={toDate} />
            )}

            {!weather.data && !weather.loading && !weather.error && (
              <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                Enter a city name to get the weather forecast.
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
