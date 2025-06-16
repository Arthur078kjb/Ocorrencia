import React, { useEffect, useState } from "react";
import { OcorrenciaForm } from "./components/OcorrenciaForm";
import { OcorrenciaList } from "./components/OcorrenciaList";
import { Ocorrencia } from "./models/interfaces";
import { Login } from "./Site/Login";

const STORAGE_KEY = "ocorrencias";

function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [logado, setLogado] = useState<boolean>(false);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("nomeUsuario");
    setLogado(false);
    setNomeUsuario("");
    setEditingIndex(null);
  };

  if (!logado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Registro de Ocorrências</h1>
        <button onClick={handleLogout} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Sair
        </button>
      </div>

      <p style={{ fontStyle: "italic" }}>Usuário logado: {nomeUsuario}</p>

      <OcorrenciaForm
        onAdd={handleAddOcorrencia}
        onEdit={handleEditOcorrencia}
        editing={editingIndex !== null ? ocorrencias[editingIndex] : null}
        onCancelEdit={handleCancelEdit}
      />

      <hr style={{ margin: "40px 0" }} />

      <OcorrenciaList
        ocorrencias={ocorrencias}
        onRemove={handleRemoveOcorrencia}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default App;
