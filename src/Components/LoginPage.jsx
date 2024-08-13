import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        if (!validateEmail(email)) {
            setError('El email es inválido');
            return false;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
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

                if (response.ok) {
                    const data = await response.json();
                    const accessToken = response.headers.get('access-token');
                    const uid = response.headers.get('uid');
                    const client = response.headers.get('client');

                    // Almacena los tokens en el almacenamiento local (o en el contexto global)
                    localStorage.setItem('access-token', accessToken);
                    localStorage.setItem('uid', uid);
                    localStorage.setItem('client', client);

                    setMessage('Inicio de sesión exitoso');
                    navigate('/home');
                } else {
                    const errorData = await response.json();
                    setMessage((errorData.error || 'Error desconocido'));
                }
            } catch (error) {
                console.error('Error details:', error); // Log the error to the console
                setMessage('Error de conexión');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
            <h2 className="text-lg font-medium mb-4">Iniciar Sesión</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            {error && <p className="mb-4 text-red-500">{error}</p>}

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Iniciar sesión
            </button>
        </form>
    );
};

export default LoginPage;
