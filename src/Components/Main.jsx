import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import LoginPage from './LoginPage'
import RegistrationForm from './RegistrationForm'

const Main = () => {
    return (
        <main className="flex-grow p-4">
            <Routes>
                <Route path='/' element={<RegistrationForm />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </main>
    )
}

export default Main