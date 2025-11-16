import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.msg); // msg vem do backend
        navigate("/login"); // redireciona automaticamente
      } else {
        alert("Erro: " + (data.msg || "Não foi possível registrar"));
      }
    } catch (err) {
      console.error("Erro ao registrar:", err);
      alert("Erro de rede. Tente novamente.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Registrar</h1>

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

      <br /><br />

      <Link to="/login">
        <button>Voltar ao Login</button>
      </Link>
    </div>
  );
}

export default Register;
