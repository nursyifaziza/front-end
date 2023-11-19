import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const FetchBarChart = () => {
  const [chartData, setChartData] = useState(null);

  const transformBarChartData = (apiData) => {
    const transformedData = {
      labels: ["Terrible", "Sad", "Okay", "Good", "Wonderful"],
      datasets: [
        {
          label: "mood count",
          // data: apiData.map((entry) => entry.count),
          data: Array(5).fill(0),
          backgroundColor: ["rgba(255, 172, 49, 0.4)", "rgba(255, 172, 49, 0.5)", "rgba(255, 172, 49, 0.6)", "rgba(255, 172, 49, 0.7)", "rgba(255, 172, 49, 0.8)"],
          borderColor: ["rgba(255, 172, 49, 1)", "rgba(255, 172, 49, 1)", "rgba(255, 172, 49, 1)", "rgba(255, 172, 49, 1)", "rgba(255, 172, 49, 1)"],
          borderWidth: 0,
          images: [
            "https://emojiisland.com/cdn/shop/products/Confounded_Face_Emoji_large.png?v=1571606037",
            "https://emojiisland.com/cdn/shop/products/Very_Sad_Face_Emoji_Icon_ios10_large.png?v=1571606092",
            "https://emojiisland.com/cdn/shop/products/Slightly_Smiling_Face_Emoji_87fdae9b-b2af-4619-a37f-e484c5e2e7a4_large.png?v=1571606036",
            "https://emojiisland.com/cdn/shop/products/Smiling_Face_Emoji_with_Blushed_Cheeks_large.png?v=1571606036",
            "https://emojiisland.com/cdn/shop/products/Heart_Eyes_Emoji_2_large.png?v=1571606090",
          ],
        },
      ],
    };

    apiData.forEach((entry) => {
      const index = transformedData.labels.indexOf(entry.moodValue);
      transformedData.datasets[0].data[index] = entry.count;
    });

    console.log("Transformed data: ", transformedData);
    return transformedData;
  };

  const xScaleImage = {
    id: "xScaleImage",
    afterDraw(chart) {
      const { ctx, data, scales } = chart;
      const yScale = scales.y;
      const xScale = scales.x;

      ctx.save();

      data.datasets[0].images.forEach((image, index) => {
        const label = new Image();
        label.src = image;
        const imageSize = 30;
        const padding = 10;

        const xPos = xScale.getPixelForValue(index);
        const yPos = yScale.bottom + padding;

        ctx.drawImage(label, xPos - imageSize / 2, yPos, imageSize, imageSize);
      });

      ctx.restore();
    },
  };

  const barConfig = {
    type: "bar",
    data: chartData,
    options: {
      scales: {
        x: {
          afterFit: (context) => {
            context.height += 40;
          },
          ticks: {
            callback: (value, index, values) => {
              return "";
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
    plugins: [xScaleImage],
  };

  // useEffect(() => {
  //   const user = localStorage.getItem("accessToken");

  //   if (user) {
  //     axios
  //       .get("http://localhost:5000/api/user/moodentries/barchart", {
  //         headers: { "x-access-token": localStorage.getItem("accessToken") },
  //       })
  //       .then((response) => {
  //         const transformedData = transformBarChartData(response.data.chartData);
  //         setChartData(transformedData);
  //         console.log(transformedData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching chart data: ", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/moodentries/barchart", {
          headers: { "x-access-token": localStorage.getItem("accessToken") },
        });

        const transformedData = transformBarChartData(response.data.chartData);
        setChartData(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching chart data: ", error);
      }
    };

    fetchData();
  }, []);

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  // ChartJS.register(xScaleImage);

  return <div>{chartData ? <Bar data={chartData} options={barConfig} /> : <p>Loading ...</p>}</div>;
};

export default FetchBarChart;
