import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; 

function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h1>Home Aerolíneas</h1>
      {isAuthenticated ? (
        <>
          <p>Hola, {user?.nombre || user?.email} 👋</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <p>
          <Link to="/login">Inicia sesión</Link> para continuar.
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}
