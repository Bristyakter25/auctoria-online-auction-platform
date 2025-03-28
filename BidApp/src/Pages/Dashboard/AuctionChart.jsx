import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const auctionData = [
  {
    _id: "67db20c177658c6c1f307972",
    productName: "Rolex Submariner 5513",
    bids: [200, 300, 350, 400, 600, 650, 700],
  },
  {
    _id: "67db223377658c6c1f307973",
    productName: "Tiffany & Co. Necklace",
    bids: [500, 550, 4400, 400, 200, 4500, 4600],
  },
  {
    _id: "67db22b377658c6c1f307974",
    productName: "Michael Jordan Rookie Card",
    bids: [400, 450, 500, 600],
  },
  {
    _id: "67db232277658c6c1f307975",
    productName: "Van Gogh's Starry Night",
    bids: [300, 400],
  },
  {
    _id: "67db28bc7f21b13115625fea",
    productName: "iPhone 13 Pro Max",
    bids: [400],
  }
];

const processedData = auctionData.map(item => ({
  name: item.productName,
  bids: item.bids.length,
}));

const AuctionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="bids" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AuctionChart;
