import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Sistema de Vendas</h1>

      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/register")} style={{ marginLeft: "20px" }}>
        Registrar
      </button>
    </div>
  );
}

export default Home;
