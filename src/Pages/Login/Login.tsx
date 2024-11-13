import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.tsx";
import Footer from "./Footer.tsx";

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(id, password);
    setLoading(false);

    if (success) {
      navigate('/home');
    } else {
      setError('Usuário ou senha incorreta!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-[#5599BE]">
      <div className="flex flex-col justify-center items-center flex-grow p-4">
        <div className="flex bg-[#132A3E] w-full max-w-md h-auto md:h-[60vh] items-center justify-center p-5 rounded-lg">
          <form className="flex flex-col w-full space-y-4 p-[10vh]" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuário"
              aria-label="Usuário"
              className="p-2 w-full rounded-md bg-white text-black"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (error) setError('');
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              aria-label="Senha"
              className="p-2 w-full rounded-md bg-white text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Login'}
            </button>
            {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
