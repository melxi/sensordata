import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

const LineChart = ({ data }) => {
  const chartRef = useRef();
  
  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    });
    myChart.update();
  }, [data])

  return <canvas ref={chartRef} />;
};

export default LineChart;
