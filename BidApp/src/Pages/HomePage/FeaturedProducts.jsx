import React, { useEffect, useState } from 'react';
import FeaturedProductCard from './FeaturedProductCard';



const FeaturedProducts = () => {
    const [featuredAuctions, setFeaturedAuctions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [filteredAuctions, setFilteredAuctions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/featuredProducts") 
            .then((res) => res.json())
            .then((data) => {
                setFeaturedAuctions(data);
                setFilteredAuctions(data); 
            })
            .catch((error) => {
                console.error("Error fetching featured auctions:", error);
            });
    }, []);
    

    useEffect(() => {
        let results = featuredAuctions.filter(auction =>
            auction?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (category !== "All") {
            results = results.filter(auction => auction.category === category);
        }

        setFilteredAuctions(results);
    }, [searchTerm, category, featuredAuctions]);

    return (
        <div>

            <h2 className="text-5xl text-black mt-20  font-bold text-center mb-4">Featured Products</h2>
            <div className="text-center mb-5 mt-10 flex  flex-wrap justify-center gap-4">

            <h2 className="text-5xl text-black mt-10  font-bold text-center mb-4">Featured Products</h2>
            <div className="text-center my-5 flex  flex-wrap justify-center gap-4">

                <input
                    type="text"
                    placeholder="Search auctions"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border w-[500px] p-2 rounded "
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 w-[250px] rounded"
                >
                    <option value="All">All</option>
                    <option value="Antiques">Antiques</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Collectibles">Collectibles</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Watches">Watches</option>
                    <option value="Art">Art</option>
                </select>
            </div>


            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">

                {filteredAuctions.length > 0 ? (
                    filteredAuctions.map(auction => (
                     <FeaturedProductCard key={auction._id} auction={auction}></FeaturedProductCard>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No auctions found</p>
                )}
            </div>
        </div>
        </div>
        </div>
    );
}
export default FeaturedProducts;
