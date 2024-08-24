import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/header';
import Main from './Components/main';
import Footer from './Components/footer';
import Banner from './Components/Banner';
import './App.css'
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';

function App() {


  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>


  )
}

export default App
