import React from 'react';
import { Typography, Box } from '@mui/material';

function Forecast({ weather, toDate }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">{weather.city}</Typography>
      <Typography variant="subtitle1">{toDate()}</Typography>
      <Typography variant="h2">{Math.round(weather.temperature.current)}°C</Typography>
      <Typography variant="h5">{weather.condition.description}</Typography>
      <Typography>Humidity: {weather.temperature.humidity}%</Typography>
      <Typography>Wind: {Math.round(weather.wind.speed)} km/h</Typography>
    </Box>
  );
}

export default Forecast;