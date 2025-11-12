// src/components/Produtos.jsx
import React, { useEffect, useState } from "react";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: "", preco: "", estoque: "" });
  const [error, setError] = useState("");

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos`);
      const data = await res.json();
      setProdutos(data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preco: parseFloat(form.preco),
          estoque: parseInt(form.estoque),
        }),
      });
      const data = await res.json();
      if (data.erro) {
        setError(data.erro);
      } else {
        setForm({ nome: "", preco: "", estoque: "" });
        fetchProdutos(); // atualizar lista
        setError("");
      }
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      setError("Erro ao cadastrar produto");
    }
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto._id}>
            {produto.nome} - R${produto.preco.toFixed(2)} - Estoque:{" "}
            {produto.estoque}
          </li>
        ))}
      </ul>

      <h3>Cadastrar Novo Produto</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={form.preco}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="estoque"
          placeholder="Estoque"
          value={form.estoque}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Produtos;
