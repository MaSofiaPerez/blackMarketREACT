import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/header';
import Main from './Components/main';
import Footer from './Components/footer';



import './App.css'

function App() {

  //ESTO ES PARA PROBAR NADA MAS, HAY QUE USAR CONTEXTO PORQUE ACA NO PUEDE IR LOGICA
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
  <Router>
    <div className="flex flex-col min-h-screen">
    <Header isAuthenticated={isAuthenticated} />
    <Main />
    <Footer />
  </div>
  </Router>


  )
}

export default App
