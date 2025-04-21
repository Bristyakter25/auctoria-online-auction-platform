import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const Analytics = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/popularProducts")
      .then((res) => res.json())
      .then((data) => setPopularProducts(data))
      .catch((err) => console.error("Error loading popular products:", err));
  }, []);

  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "rgba(59,130,247,0.05)");
    gradient.addColorStop(1, "rgba(59,130,247,0.3)");
    return gradient;
  };

  const crosshairPlugin = {
    id: "customCrosshair",
    afterDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const topY = chart.chartArea.top;
        const bottomY = chart.chartArea.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.setLineDash([5, 5]); // <-- Dotted line
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const chartData = {
    labels: popularProducts.map((p) => p.productName),
    datasets: [
      {
        label: "Total Bids",
        data: popularProducts.map((p) => p.totalBids),
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(59,130,247,0.05)";
          return createGradient(ctx, chartArea);
        },
        borderColor: "#89dcf5",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const idx = tooltipItems[0].dataIndex;
            return `${popularProducts[idx]?.productName || "Unknown"}`;
          },
          label: function (tooltipItem) {
            const idx = tooltipItem.dataIndex;
            const totalBids = popularProducts[idx]?.totalBids || 0;
            const bids = popularProducts[idx]?.bids || [];
            const highestBid = bids.length
              ? Math.max(...bids.map((b) => b.amount))
              : 0;

            return [
              `🔁 Total Bids: ${totalBids}`,
              `💰 Highest Bid: ${highestBid}`,
            ];
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    // plugins: [crosshairPlugin], // Register custom plugin
    crosshairPlugin,
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-5 py-5">
        Popular Products based on Bids!
      </h2>
      <div className="w-full bg-white  rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Bids Analysis</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20h6M9 4a3 3 0 00-6 0v16h6V4zM15 11a3 3 0 006 0V4a3 3 0 00-6 0v7z"
              />
            </svg>
          </div>
        </div>

        {/* Chart container */}
        <div className="w-full h-28 sm:h-32 md:h-36 lg:h-40">
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
