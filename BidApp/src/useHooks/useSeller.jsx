import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const useSeller = () => {
    const {user} = useContext(AuthContext)
    
};

export default useSeller;