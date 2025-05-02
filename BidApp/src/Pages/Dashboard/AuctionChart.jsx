import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
} from "recharts";
import SellerProfile from "../../SellerProfile/SellerProfile";
import StatsCards from "../BidTask/StatsCards";

const AuctionChart = () => {
  const [liveProducts, setLiveProducts] = useState([]);
  const [endedProducts, setEndedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/addProducts")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const live = [];
        const ended = [];

        data.forEach((item) => {
          const endDate = new Date(item.endDate);
          const productName =
            item.productName.length > 20
              ? item.productName.slice(0, 20) + "..."
              : item.productName;

          const chartItem = {
            name: productName,
            bids: item.bids?.length || 0,
          };

          if (item.status === "expired" || endDate < now) {
            ended.push(chartItem);
          } else {
            live.push(chartItem);
          }
        });

        setLiveProducts(live);
        setEndedProducts(ended);
      })
      .catch((err) => console.error("Chart Data Fetch Error:", err));
  }, []);

  const renderBarChart = (title, data) => (
    <div className="w-full md:w-1/2 p-4">
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-3">
        {title}
      </h3>
      <div className="bg-gray-50 shadow rounded-xl p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 50 }}
          >
            {/* Gradient definition */}
            <defs>
              <linearGradient id="purpleBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.9} />
              </linearGradient>
            </defs>
  
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              wrapperStyle={{ zIndex: 100 }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
              cursor={{ fill: "#f0f0f0" }}
            />
            <Bar dataKey="bids" fill="url(#purpleBlueGradient)" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="bids" position="top" fill="#333" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  
  const renderLiveBarChart = (title, data) => (
    <div className="w-full md:w-1/2 p-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">{title}</h3>
      <div className="bg-white shadow-xl rounded-2xl p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value} Bids`, "Total"]}
              contentStyle={{
                backgroundColor: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            <Bar
              dataKey="bids"
              fill="url(#colorBids)"
              radius={[12, 12, 0, 0]}
              barSize={30}
            >
              <LabelList dataKey="bids" position="top" fill="#374151" fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  const renderLineAreaChart = (title, data) => (
    <div className="w-full p-4">
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-3">
        {title}
      </h3>
      <div className="bg-gray-50 shadow rounded-xl p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="bids"
              stroke="#6D28D9"
              fill="url(#colorBids)"
              dot={{ r: 5, stroke: '#6D28D9', strokeWidth: 2, fill: 'white' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
        Auction Product Bid Summary
      </h2>

      <StatsCards />
      <div className="mt-10">
        {renderLineAreaChart("Bid Trends Overview", [...liveProducts, ...endedProducts])}
      </div>
      {/* Bar Charts Section */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
  {renderLiveBarChart("Live Auction Products", liveProducts, "#6D28D9")}
  {renderBarChart("Ended Auction Products", endedProducts, "#F59E0B")}
</div>


    </div>
  );
};

export default AuctionChart;
