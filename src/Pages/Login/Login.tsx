import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.tsx";
import Footer from "./Footer.tsx";
import "./Login.scss"; // Importe o arquivo SCSS

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
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuário"
              aria-label="Usuário"
              className="login-input"
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
              className="login-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Login'}
            </button>
            {error && <div className="login-error">{error}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
