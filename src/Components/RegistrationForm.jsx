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
                    console.error('Error details:', error); 
                    setMessage('Error de conexión')
                }
        }
    }


    return (
        <div className="flex min-h-screen">
        {/* Columna izquierda para la imagen */}
        <div className="w-1/2 bg-cover bg-right rounded bg-imgRegistro" >
        </div>

        {/* Columna derecha para el formulario */}
        <div className="w-1/2 flex justify-center items-center bg-white">
            <form onSubmit={handleSubmit} className="p-6 max-w-md w-full">
                <h2 className="text-5xl font-medium mb-6">Crear Cuenta</h2>

                {message && <p className="mb-4 text-red-500">{message}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                    {error.email && <p className="text-red-500">{error.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                    {error.name && <p className="text-red-500">{error.name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                    {error.password && <p className="text-red-500">{error.password}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                        required
                    />
                    {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    </div>
    )
}

export default RegistrationForm