import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../useHooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import UpdateSingeleBid from './UpdateSingeleBid';

const UpdateBid = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    console.log(user?.email);

    const [allBids, setAllBids] = useState([]);
   
      const { data: bids = [], refetch } = useQuery({
        queryKey: ["bids"],
        queryFn: async () => {
          const res = await axiosSecure(`/addProducts/${user?.email}`);
          return res.data;
        },
      });
      console.log(bids);
    return (
        <div>
            {
                bids.map(bid=> <UpdateSingeleBid key={bid._id} bid={bid}></UpdateSingeleBid>)
            }

        </div>
    );
};

export default UpdateBid;