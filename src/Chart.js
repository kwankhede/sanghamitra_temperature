import React, { useEffect, useState } from "react";
import ReactApexCharts from "react-apexcharts";

const Chart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data and prepare chart data
    // Replace this with your own data-fetching logic
    const fetchData = async () => {
      // Mock data
      const response = await fetch("/data.csv");
      const text = await response.text();

      const rows = text.split("\n");
      const data = rows.map((row) => {
        const [time, dry_bulb, wet_bulb] = row.split(",");
        return { time, dry_bulb, wet_bulb };
      });

      // Prepare chart data
      const labels = data.map((entry) => entry.time);
      const dryBulbData = data.map((entry) => parseFloat(entry.dry_bulb));
      const wetBulbData = data.map((entry) => parseFloat(entry.wet_bulb));

      setChartData({
        series: [
          {
            name: "Dry Bulb",
            data: dryBulbData,
          },
          {
            name: "Wet Bulb",
            data: wetBulbData,
          },
        ],
        options: {
          chart: {
            type: "line",
            toolbar: {
              show: false,
            },
          },
          colors: ["#FF0000", "#0000FF"],
          stroke: {
            width: 2,
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: labels,
          },
          yaxis: {
            title: {
              text: "Temperature",
            },
          },
          legend: {
            position: "top",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
        <ReactApexCharts
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={400}
        />
      )}
    </div>
  );
};

export default Chart;
