// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState(""); // mensagem para tela
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMsg(""); // limpa mensagem anterior

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.msg || "Usuário registrado com sucesso!");
        setTimeout(() => navigate("/login"), 1500); // redireciona para login
      } else {
        setMsg(data.msg || "Não foi possível registrar");
      }
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setMsg("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Registrar</h1>
      {msg && <p style={{ color: "red" }}>{msg}</p>} {/* mostra mensagem */}
      <form onSubmit={handleRegister} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br /><br />
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
          Registrar
        </button>
      </form>
      <br />
      <Link to="/login">
        <button>Voltar ao Login</button>
      </Link>
    </div>
  );
}

export default Register;
