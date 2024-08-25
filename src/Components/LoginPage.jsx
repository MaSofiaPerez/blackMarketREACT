import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const { setIsAuthenticated } = useAuth();


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        if (!validateEmail(email)) {
            setError('El email es inválido');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            user: {
                email: email,
                password: password
            }
        }

        if (validateForm()) {
            try {
                const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users/sign_in', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });

                const data = await response.json();

                if (response.ok) {
                    const accessToken = response.headers.get('access-token');
                    const uid = response.headers.get('uid');
                    const client = response.headers.get('client');
                    localStorage.setItem('access-token', accessToken);
                    localStorage.setItem('uid', uid);
                    localStorage.setItem('client', client);
                    setIsAuthenticated(true);
                    setMessage('Inicio de sesión exitoso');
                    navigate('/home');
                } else {
                    setMessage('E-mail o contraseña inválidos.');
                }
            } catch (error) {
                setMessage('Error de conexión');
            }
        }
    };

    return (
        <div className="flex min-h-screen">
        <div className="w-1/2 bg-cover bg-center bg-imgLogin rounded">
        </div>
        <div className="w-1/2 flex justify-center items-center bg-white">
            <form onSubmit={handleSubmit} className="p-6 max-w-md w-full">
                <h2 className="text-5xl font-medium mb-4 ">Iniciar Sesión</h2>


                {message && (
                        <div className="text-red-500 text-md font-bold mb-1">
                            {message}
                        </div>
                    )}                
                {error && <p className="mb-4 text-red-500">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white font-medium p-2 rounded"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    </div>
    );
};

export default LoginPage;
