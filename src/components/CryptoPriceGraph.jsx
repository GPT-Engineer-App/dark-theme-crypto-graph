import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, useColorMode } from "@chakra-ui/react";
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoPriceGraph = () => {
  const [prices, setPrices] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1");
        const data = await response.json();
        setPrices(data.data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Fetch new prices every minute

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: prices.map((price) => new Date(price.time).toLocaleDateString()),
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: prices.map((price) => price.priceUsd),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: colorMode === "dark" ? "#fff" : "#000",
        },
      },
      y: {
        ticks: {
          color: colorMode === "dark" ? "#fff" : "#000",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: colorMode === "dark" ? "#fff" : "#000",
        },
      },
    },
  };

  return (
    <Box width="100%" height="500px">
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default CryptoPriceGraph;