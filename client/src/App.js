import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./components/LineChart";

function App() {
  const [chartData, setChartData] = useState({});
  const [sensorsData, setSensorsData] = useState([])

  const getData = () => {
    axios.get("/api/events")
      .then(({ data }) => {
        setChartData({
          labels: data.map(d => new Date(d.date).toLocaleString("fi-FI")),
          datasets: [
            {
              label: "Sensor1",
              data: data.map(d => d.sensor1),
              fill: 'none',
              borderColor: "#1A4C68"
            },
            {
              label: "Sensor2",
              data: data.map(d => d.sensor2),
              fill: 'none',
              borderColor: "#59609E"
            },
            {
              label: "Sensor3",
              data: data.map(d => d.sensor3),
              fill: 'none',
              borderColor: "#BB65A3"
            },
            {
              label: "Sensor4",
              data: data.map(d => d.sensor4),
              fill: 'none',
              borderColor: "#EDA632"
            }
          ]
        })
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setInterval(getData, 1000 * 60 * 60);
    getData();
    
    return () => clearInterval(getData);
  }, []);
  
  if (!chartData) return null;

  return (
    <div className="App">
      <h1>Sensors</h1>
      <LineChart data={chartData} />
    </div>
  );
}

export default App;
