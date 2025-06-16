import React from "react";
import { Ocorrencia } from "../models/interfaces";

interface Props {
  ocorrencias: Ocorrencia[];
  onRemove: (index: number) => void;
  onEditClick: (index: number) => void;
}

export const OcorrenciaList: React.FC<Props> = ({ ocorrencias, onRemove, onEditClick }) => {
  if (ocorrencias.length === 0) {
    return <p>Nenhuma ocorrência registrada.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: 900, margin: "0 auto" }}>
      <thead>
        <tr style={{ backgroundColor: "#4caf50", color: "white" }}>
          <th style={thStyle}>Aluno</th>
          <th style={thStyle}>Turma</th>
          <th style={thStyle}>Professor</th>
          <th style={thStyle}>Disciplina</th>
          <th style={thStyle}>Aula</th>
          <th style={thStyle}>Motivo</th>
          <th style={thStyle}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {ocorrencias.map((ocorrencia, index) => (
          <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
            <td style={tdStyle}>{ocorrencia.aluno.nome} ({ocorrencia.aluno.idade} anos)</td>
            <td style={tdStyle}>{ocorrencia.aluno.turma}</td>
            <td style={tdStyle}>{ocorrencia.professor.nome} ({ocorrencia.professor.idade} anos)</td>
            <td style={tdStyle}>{ocorrencia.professor.disciplina}</td>
            <td style={tdStyle}>{ocorrencia.aula}</td>
            <td style={tdStyle}>{ocorrencia.motivo}</td>
            <td style={tdStyle}>
              <button
                onClick={() => onEditClick(index)}
                style={{
                  marginRight: 16,
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: "#4caf50",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#388e3c")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#4caf50")}
              >
                Editar
              </button>

              <button
                onClick={() => onRemove(index)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: "#e53935",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b71c1c")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e53935")}
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  border: "1px solid #ddd",
};

const rowEven: React.CSSProperties = {
  backgroundColor: "#f1f8e9",
};

const rowOdd: React.CSSProperties = {
  backgroundColor: "#ffffff",
};
