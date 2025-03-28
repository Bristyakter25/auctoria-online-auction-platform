import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateBid = () => {
    const [allBids, setAllBids] = useState([]);
      useEffect(() => {
        fetch(`http://localhost:5000/addProducts`)
          .then((res) => res.json())
          .then((data) => {
            setAllBids(data);
          })
          .catch((error) => {
            console.error("Error fetching auctions:", error);
          });
      }, []);
    //   const { data: bids = [], refetch } = useQuery({
    //     queryKey: ["bids", search],
    //     queryFn: async () => {
    //       const res = await axios.get(`http://localhost:5000/addProducts`);
    //       return res.data;
    //     },
    //   });
    return (
        <div>
            update bid

        </div>
    );
};

export default UpdateBid;