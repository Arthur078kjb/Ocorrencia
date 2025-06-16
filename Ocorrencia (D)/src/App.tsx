import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { OcorrenciaForm } from "./components/OcorrenciaForm";
import { OcorrenciaList } from "./components/OcorrenciaList";
import { Ocorrencia } from "./models/interfaces";
import { Login } from "./Site/Login";

const STORAGE_KEY = "ocorrencias";

const Home: React.FC<{
  nomeUsuario: string;
  onLogout: () => void;
  ocorrencias: Ocorrencia[];
  onAdd: (nova: Ocorrencia) => void;
  onRemove: (index: number) => void;
  onEditClick: (index: number) => void;
  onEdit: (nova: Ocorrencia) => void;
  editingIndex: number | null;
  onCancelEdit: () => void;
}> = ({
  nomeUsuario,
  onLogout,
  ocorrencias,
  onAdd,
  onRemove,
  onEditClick,
  onEdit,
  editingIndex,
  onCancelEdit
}) => (
  <div style={{ padding: "20px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1>Registro de Ocorrências</h1>
      <button onClick={onLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
        Sair
      </button>
    </div>

    <p style={{ fontStyle: "italic" }}>Usuário logado: {nomeUsuario}</p>

    <OcorrenciaForm
      onAdd={onAdd}
      onEdit={onEdit}
      editing={editingIndex !== null ? ocorrencias[editingIndex] : null}
      onCancelEdit={onCancelEdit}
    />

    <hr style={{ margin: "40px 0" }} />

    <OcorrenciaList
      ocorrencias={ocorrencias}
      onRemove={onRemove}
      onEditClick={onEditClick}
    />
  </div>
);

function AppRouter() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [logado, setLogado] = useState<boolean>(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const logadoLocal = localStorage.getItem("usuarioLogado") === "true";
    const nome = localStorage.getItem("nomeUsuario") || "";
    setLogado(logadoLocal);
    setNomeUsuario(nome);

    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setOcorrencias(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  }, [ocorrencias]);

  const handleAddOcorrencia = (nova: Ocorrencia) => {
    setOcorrencias((prev) => [...prev, nova]);
  };

  const handleRemoveOcorrencia = (index: number) => {
    setOcorrencias((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleEditOcorrencia = (nova: Ocorrencia) => {
    if (editingIndex !== null) {
      setOcorrencias((prev) => {
        const updated = [...prev];
        updated[editingIndex] = nova;
        return updated;
      });
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleLogin = (nome: string) => {
    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("nomeUsuario", nome);
    setNomeUsuario(nome);
    setLogado(true);
    navigate("/"); // redirecionar após login
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("nomeUsuario");
    setLogado(false);
    setNomeUsuario("");
    setEditingIndex(null);
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          logado ? (
            <Home
              nomeUsuario={nomeUsuario}
              onLogout={handleLogout}
              ocorrencias={ocorrencias}
              onAdd={handleAddOcorrencia}
              onRemove={handleRemoveOcorrencia}
              onEditClick={handleEditClick}
              onEdit={handleEditOcorrencia}
              editingIndex={editingIndex}
              onCancelEdit={handleCancelEdit}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="*" element={<Navigate to={logado ? "/" : "/login"} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
