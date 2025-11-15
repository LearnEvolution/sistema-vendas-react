import { useState } from "react";
import api from "../services/api";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/registrar", {
        nome,
        email,
        telefone,
        senha,
      });

      setMsg("Cadastro realizado com sucesso!");
    } catch (err) {
      setMsg("Erro ao cadastrar");
      console.error(err);
    }
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>Registrar</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <br /><br />
        
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
        <br /><br />

        <button type="submit">Cadastrar</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Register;
