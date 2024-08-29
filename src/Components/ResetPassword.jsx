import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const resetToken = query.get('reset_password_token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
    
        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden');
            return;
        }
    
        try {
            const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${resetToken}`,  
                },
                body: JSON.stringify({
                    password: password,
                    password_confirmation: passwordConfirmation,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage(data.message); 
                setTimeout(() => navigate('/login'), 3000); 
            } else {
                setError(data.errors[0]); 
            }
        } catch (error) {
            setError('Ocurrió un error al cambiar la contraseña. Por favor, intenta de nuevo.');
        }
    };
    

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Cambiar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                </div>
                {message && <p className="text-green-700 font-medium">{message}</p>}
                {error && <p className="text-red-700 mb-2 font-medium">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
