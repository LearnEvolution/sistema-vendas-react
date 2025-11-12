// src/components/Clientes.jsx
import React, { useEffect, useState } from "react";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [error, setError] = useState("");

  // Buscar clientes
  const fetchClientes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/clientes`);
      const data = await res.json();
      setClientes(data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.erro) {
        setError(data.erro);
      } else {
        setForm({ nome: "", email: "", telefone: "" });
        fetchClientes(); // atualizar lista
        setError("");
      }
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      setError("Erro ao cadastrar cliente");
    }
  };

  if (loading) return <p>Carregando clientes...</p>;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nome} - {cliente.email} - {cliente.telefone}
          </li>
        ))}
      </ul>

      <h3>Cadastrar Novo Cliente</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Clientes;
