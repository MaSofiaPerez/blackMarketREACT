import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import LoginPage from './LoginPage'
import RegistrationForm from './RegistrationForm'
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const Main = () => {
    return (
        <main className="flex-grow p-4">
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