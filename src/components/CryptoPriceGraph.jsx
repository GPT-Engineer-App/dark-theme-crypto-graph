import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, useColorMode } from '@chakra-ui/react';
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoPriceGraph = () => {
  const [chartData, setChartData] = useState({});
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1');
      const data = await response.json();
      const prices = data.data.map(entry => entry.priceUsd);
      const dates = data.data.map(entry => new Date(entry.time).toLocaleDateString());

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Bitcoin Price (USD)',
            data: prices,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <Box width="100%" height="500px" bg={colorMode === 'dark' ? 'gray.800' : 'white'} p={4} borderRadius="md" boxShadow="lg">
      <Line data={chartData} />
    </Box>
  );
};

export default CryptoPriceGraph;