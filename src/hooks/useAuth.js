import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate("/");
        return;
      }

      try {
        // Verify token with your backend
        const response = await axios.get("http://localhost:5000/api/profiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Token invalid");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  return { isLoading, isAuthenticated };
};
