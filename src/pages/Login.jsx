// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState(""); // mensagem na tela
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!data.token) {
        setMsg(data.msg || "Email ou senha incorretos");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setMsg("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Login</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Entrar
        </button>
      </form>
      <br />
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Login;
