

import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "lucide-react";

const FavoritePage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const userEmail = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axiosPublic.get(`/favorite/${userEmail}`);
        setFavorites(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (userEmail) {
      fetchFavorite();
    }
  }, [userEmail, axiosPublic]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-pink-600 p-3 rounded-xl">
            <HeartIcon className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">আমার প্রিয় বিক্রেতারা</h1>
            <p className="text-sm text-gray-400">
              মোট {favorites.length} জন বিক্রেতা সংরক্ষিত
            </p>
          </div>
        </div>

        {/* Top Tooltip Image Row */}
        <div className="flex flex-wrap gap-3 mb-6">
          {favorites.map((seller) => (
            <Tooltip key={seller._id} title={seller.name} arrow>
              <img
                src={seller.photoUrl}
                alt={seller.name}
                className="w-10 h-10 rounded-full border-2 border-pink-500 shadow"
              />
            </Tooltip>
          ))}
        </div>

        {/* Card Table Layout */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((seller, index) => (
              <div
                key={seller._id}
                className="bg-[#1e293b] border border-gray-700 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  {/* <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full border-4 border-pink-600"
                  /> */}
                  <div>
                    <h2 className="text-lg font-semibold">{seller.name}</h2>
                    <p className="text-gray-400 text-sm">{seller.email}</p>
                  </div>
                </div>
                <div className="text-right mt-auto">
                  <button
                    onClick={() => navigate(`/seller-profile/${seller._id}`)}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-1.5 rounded-full transition"
                  >
                    প্রোফাইল দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-16">
            এখনো কোনো প্রিয় বিক্রেতা নেই।
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
