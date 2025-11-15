import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ margin: "50px" }}>
      <h1>Bem-vindo ao Sistema de Vendas!</h1>

      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Dashboard;
