import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const errorTemp = {};

        if (!name) errorTemp.name = 'El campo Nombre está incompleto';
        if (!validateEmail(email)) errorTemp.email = 'El email es inválido';
        if (password.length < 6) errorTemp.password = 'La contraseña debe tener al menos 6 caracteres';
        if (password !== confirmPassword) errorTemp.confirmPassword = 'Las contraseñas no coinciden';

        setError(errorTemp);
        return Object.keys(errorTemp).length === 0;
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }

        const newError = { ...error };

        if (field === 'name' && value) {
            delete newError.name;
        }
        if (field === 'email' && validateEmail(value)) {
            delete newError.email;
        }
        if (field === 'password' && value.length >= 6) {
            delete newError.password;
        }
        if (field === 'confirmPassword' && value === password) {
            delete newError.confirmPassword;
        }

        setError(newError);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            user: {
                email: email,
                name: name,
                password: password,
                password_confirmation: confirmPassword
            }
        };

        if (validateForm()) {
            try {
                const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });

                const data = await response.json();

                if (data.status === 'success') {
                    navigate('/login');
                } else if (data.status === 'error') {
                    setMessage('Ya existe un usuario con el e-mail ingresado');
                }
            } catch (error) {
                setMessage('Error de conexión');
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-cover bg-right rounded bg-imgRegistro"></div>

            <div className="w-1/2 flex justify-center items-center bg-white">
                <form onSubmit={handleSubmit} className="p-6 max-w-md w-full">
                    <h2 className="text-5xl font-medium mb-4">Crear Cuenta</h2>

                    {message && <div className="text-red-500 text-md font-bold">{message}</div>}

                    <div className="mb-4 mt-2">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                        {error.email && <p className="text-red-500">{error.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                        {error.name && <p className="text-red-500">{error.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                        {error.password && <p className="text-red-500">{error.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                        {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-medium p-2 rounded"
                    >
                        Crear Cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
