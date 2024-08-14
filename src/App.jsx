import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/header';
import Main from './Components/main';
import Footer from './Components/footer';
import Banner from './Components/Banner';
import './App.css'
import { AuthProvider } from './Context/AuthContext';

function App() {


  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header  />
          <Banner />
          <Main />
          <Footer />
        </div>
      </Router>
    </AuthProvider>


  )
}

export default App
