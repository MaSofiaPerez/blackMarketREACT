import ProductCarousel from "./PoductCarousel"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from "react";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (!isAuthenticated) {
          navigate('/login');
      }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; 

  return (
    <div>
        <ProductCarousel /> 
    </div>
  )
}

export default Home