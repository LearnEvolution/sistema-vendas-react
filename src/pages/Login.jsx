import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, senha });

      login(res.data.token); // salva token
      navigate("/dashboard"); // redireciona

    } catch (err) {
      setMsg("Email ou senha incorreto.");
    }
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <br /><br />

        <button type="submit">Entrar</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Login;
