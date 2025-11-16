import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!data.token) {
        alert(data.msg || "Email ou senha incorretos");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // vai para a página de boas-vindas
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Login</h1>

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
