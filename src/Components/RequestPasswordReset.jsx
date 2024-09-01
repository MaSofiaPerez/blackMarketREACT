import { useState } from 'react';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/users/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email,
                    "redirect_url": "http://localhost:5173/reset-password"  
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setIsSubmitted(true); 
            } else {
                setError(data.error); 
            }
        } catch (error) {
            setError('Ocurrió un error al enviar la solicitud. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
            {isSubmitted ? (
                <p className="text-green-700 font-medium">{message}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 pb-2 font-medium">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Enviar
                    </button>
                </form>
            )}
        </div>
    );
};

export default RequestPasswordReset;
