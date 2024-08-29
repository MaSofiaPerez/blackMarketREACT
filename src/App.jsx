import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import Main from './Components/main';
import Footer from './Components/footer';
import Banner from './Components/Banner';
import './App.css'
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';

function App() {


  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider >
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
          </div>
        </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>


  )
}

export default App
