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
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-8 max-w-lg w-full bg-white shadow-md rounded-md">
                <h2 className="text-lg font-medium mb-4 text-center">Iniciar Sesión</h2>
                {message && <p className="mb-4 text-red-500 text-center">{message}</p>}
                {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
