"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: { accounts: DoughnutChartProps }) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [1250, 2500, 3700],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labes: ["Bank 1", "Bank 2", "Bank 3"],
  };
  return <Doughnut data={data} options={{ cutout: "60%" }} />;
};

export default DoughnutChart;
