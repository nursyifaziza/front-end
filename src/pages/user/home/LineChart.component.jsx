import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import axios from "axios";

const FetchLineChart = () => {
  const [chartData, setChartData] = useState(null);

  const transformLineChartData = (apiData) => {
    const transformedData = {
      labels: [],
      datasets: [
        {
          label: "mood entries chart",
          data: [],
          borderColor: "#FFD18D",
          borderWidth: 2,
          pointStyle: [],
          tension: 0.4,
          pointHoverRadius: 40,
        },
      ],
    };

    let terrible = new Image(15, 15);
    terrible.src = "https://emojiisland.com/cdn/shop/products/Confounded_Face_Emoji_large.png?v=1571606037";
    let bad = new Image(15, 15);
    bad.src = "https://emojiisland.com/cdn/shop/products/Very_Sad_Face_Emoji_Icon_ios10_large.png?v=1571606092";
    let okay = new Image(15, 15);
    okay.src = "https://emojiisland.com/cdn/shop/products/Slightly_Smiling_Face_Emoji_87fdae9b-b2af-4619-a37f-e484c5e2e7a4_large.png?v=1571606036";
    let good = new Image(15, 15);
    good.src = "https://emojiisland.com/cdn/shop/products/Smiling_Face_Emoji_with_Blushed_Cheeks_large.png?v=1571606036";
    let wonderful = new Image(25, 25);
    wonderful.src = "https://emojiisland.com/cdn/shop/products/Heart_Eyes_Emoji_2_large.png?v=1571606090";

    apiData.forEach((entry) => {
      const date = new Date(entry.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      transformedData.labels.push(date);

      let numericalValue = 0;

      switch (entry.moodValue) {
        case "Terrible":
          numericalValue = 1;
          break;
        case "Bad":
          numericalValue = 2;
          break;
        case "Okay":
          numericalValue = 3;
          break;
        case "Good":
          numericalValue = 4;
          break;
        case "Wonderful":
          numericalValue = 5;
          break;
        default:
          numericalValue = 3;
          break;
      }

      transformedData.datasets[0].data.push(numericalValue);
      transformedData.datasets[0].pointStyle.push(getPointStyle(entry.moodValue, terrible, bad, okay, good, wonderful));
    });

    console.log("Transformed Data:", transformedData);
    return transformedData;
  };

  const getPointStyle = (moodValue, terrible, bad, okay, good, wonderful) => {
    let pointStyle = okay;

    switch (moodValue) {
      case "Terrible":
        return terrible;
      case "Bad":
        return bad;
      case "Okay":
        return okay;
      case "Good":
        return good;
      case "Wonderful":
        return wonderful;
      default:
        return okay;
    }

    return pointStyle;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    const user = localStorage.getItem("accessToken");

    if (user) {
      axios
        .get("http://localhost:5000/api/user/moodentries/linechart", {
          headers: { "x-access-token": localStorage.getItem("accessToken") },
        })
        .then((response) => {
          const transformedData = transformLineChartData(response.data.chartData);
          setChartData(transformedData);
          console.log(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
        });
    }
  }, []);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  return <div>{chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}</div>;
};

export default FetchLineChart;
