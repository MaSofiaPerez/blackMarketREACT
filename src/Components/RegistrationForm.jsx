import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validateForm = () => {
        const errorTemp = {}

        if (!name) errorTemp.name = 'El campo Nombre está incompleto'
        if (!validateEmail(email)) errorTemp.email = 'El email es inválido'
        if (password.length < 6) errorTemp.password = 'La constraseña debe tener al menos 6 caracteres'
        if (password !== confirmPassword) errorTemp.confirmPassword = 'Las contraseñas no coinciden'

        setError(errorTemp)
        return Object.keys(errorTemp).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            user: {
                email: email,
                name: name,
                password: password,
                password_confirmation: confirmPassword
            }
        }

        if(validateForm()){
                try {
                    const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json' },
                        body: JSON.stringify(user)
                    })
        
                    const data = await response.json()
        
                    if (response.ok) {
                        if (data.status === 'success') {
                            setMessage('Usuario creado correctamente')
                            navigate('/login')
                        } else {
                            setMessage('Error al crear usuario: ' + (data.message || 'Error desconocido'))
                        }
                    } else {
                        setMessage('Error al crear usuario: ' + (data.message || 'Error desconocido'))
                    }
                } catch (error) {
                    console.error('Error details:', error); // Log the error to the console
                    setMessage('Error de conexión')
                }
        }
    }


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit} className="p-8 max-w-lg w-full bg-white shadow-md rounded-md">
                <h2 className="text-lg font-medium mb-4 text-center">Crear Cuenta</h2>
                {message && <p className="mb-4 text-red-500">{message}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                    {error.email && <p className="text-red-500">{error.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                    {error.name && <p className="text-red-500">{error.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                    {error.password && <p className="text-red-500">{error.password}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm">Confirmar contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    />
                    {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    )
}

export default RegistrationForm