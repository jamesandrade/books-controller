import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export function VerifyToken(){
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken: any = jwt_decode(token);
          if (decodedToken.exp < Date.now() / 1000) {
            navigate("/");
          }
        } else {
            navigate("/");
        }
      }, [])
}