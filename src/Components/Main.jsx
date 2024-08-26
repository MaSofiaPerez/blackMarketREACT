import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home'
import LoginPage from './LoginPage'
import RegistrationForm from './RegistrationForm'
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Banner from './Banner';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';
import FavoritesPage from './FavoritesPage';



const Main = () => {
    const {isAuthenticated} = useAuth()
    const location = useLocation();
    const navigate = useNavigate()

    const hideBannerRoutes = ['/login', '/'];

    const shouldShowBanner = !hideBannerRoutes.includes(location.pathname);

    useEffect(()=> {
        const protectedRoutes = ['/home', '/product:id', '/cart', '/favorites']

        if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
            navigate('/home');
        }

        if(!isAuthenticated && protectedRoutes.includes(location.pathname)){
            navigate('/login')
        }
    }, [isAuthenticated, location.pathname, navigate])

    return (
        <main className="flex-grow p-4">
            {shouldShowBanner && <Banner />}
            <Routes>
                <Route path='/' element={<RegistrationForm />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home' element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element = {<FavoritesPage />} />
            </Routes>
        </main>
    )
}

export default Main