import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(""); // NOVO
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!data.token) {
        setMensagem("Email ou senha incorretos."); // NOVO
        return;
      }

      localStorage.setItem("token", data.token);
      setMensagem("Login bem-sucedido! Redirecionando..."); // NOVO

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Erro no login:", err);
      setMensagem("Erro de rede. Tente novamente."); // NOVO
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Login</h1>

      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>} {/* NOVO */}

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

      <br /><br />

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Login;
