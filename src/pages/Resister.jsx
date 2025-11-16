import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(""); // NOVO
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMensagem("");

    try {
      const res = await fetch(`${API_URL}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Usuário registrado com sucesso!"); // NOVO
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMensagem(data.msg || "Erro ao registrar"); // NOVO
      }
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setMensagem("Erro de rede. Tente novamente."); // NOVO
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Registrar</h1>

      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>} {/* NOVO */}

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
