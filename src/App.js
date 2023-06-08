import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    // Fetch data and update state
    const response = await fetch("/data.csv");
    const text = await response.text();

    const rows = text.split("\n");
    const newData = rows.map((row) => {
      const [time, dry_bulb, wet_bulb] = row.split(",");
      const difference = wet_bulb - dry_bulb; // Calculate the temperature difference
      return { time, dry_bulb, wet_bulb, difference };
    });

    setData(newData);
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set interval to fetch data every 30 minutes
    const intervalId = setInterval(fetchData, 30 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app-container">
      <h1>Temperature Data</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Dry Bulb</th>
            <th>Wet Bulb</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td>{row.dry_bulb}</td>
              <td>{row.wet_bulb}</td>
              <td>{row.difference}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Chart />
    </div>
  );
};

export default App;
