import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home'
import LoginPage from './LoginPage'
import RegistrationForm from './RegistrationForm'
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Banner from './Banner';


const Main = () => {

    const location = useLocation();

  // Rutas donde el banner NO debería mostrarse
  const hideBannerRoutes = ['/login', '/'];

  const shouldShowBanner = !hideBannerRoutes.includes(location.pathname);

    return (
        <main className="flex-grow p-4">
             {shouldShowBanner && <Banner />}
            <Routes>
                <Route path='/' element={<RegistrationForm />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home' element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        </main>
    )
}

export default Main