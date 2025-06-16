import React, { useEffect, useState } from "react";
import { Aluno, Professor, Ocorrencia } from "../models/interfaces";

interface Props {
  onAdd: (ocorrencia: Ocorrencia) => void;
  onEdit?: (ocorrencia: Ocorrencia) => void;
  editing?: Ocorrencia | null;
  onCancelEdit?: () => void;
}

export const OcorrenciaForm: React.FC<Props> = ({ onAdd, onEdit, editing, onCancelEdit }) => {
  const [aluno, setAluno] = useState<Aluno>({ nome: "", idade: 0, turma: "" });
  const [professor, setProfessor] = useState<Professor>({ nome: "", idade: 0, disciplina: "" });
  const [motivo, setMotivo] = useState("");
  const [aula, setAula] = useState("");

  useEffect(() => {
    if (editing) {
      setAluno(editing.aluno);
      setProfessor(editing.professor);
      setMotivo(editing.motivo);
      setAula(editing.aula);
    } else {
      setAluno({ nome: "", idade: 0, turma: "" });
      setProfessor({ nome: "", idade: 0, disciplina: "" });
      setMotivo("");
      setAula("");
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaOcorrencia: Ocorrencia = { aluno, professor, motivo, aula };

    if (editing && onEdit) {
      onEdit(novaOcorrencia);
    } else {
      onAdd(novaOcorrencia);
    }

    // Limpar campos se não estiver editando
    if (!editing) {
      setAluno({ nome: "", idade: 0, turma: "" });
      setProfessor({ nome: "", idade: 0, disciplina: "" });
      setMotivo("");
      setAula("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>{editing ? "Editar Ocorrência" : "Registrar Ocorrência"}</h2>

      {/* Aluno */}
      <input
        name="nome"
        value={aluno.nome}
        onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
        placeholder="Nome do Aluno"
        required
      />
      <input
        name="idade"
        type="number"
        value={aluno.idade || ""}
        onChange={(e) => setAluno({ ...aluno, idade: +e.target.value })}
        placeholder="Idade do Aluno"
        required
      />
      <input
        name="turma"
        value={aluno.turma}
        onChange={(e) => setAluno({ ...aluno, turma: e.target.value })}
        placeholder="Turma"
        required
      />

      {/* Professor */}
      <input
        name="nome"
        value={professor.nome}
        onChange={(e) => setProfessor({ ...professor, nome: e.target.value })}
        placeholder="Nome do Professor"
        required
      />
      <input
        name="idade"
        type="number"
        value={professor.idade || ""}
        onChange={(e) => setProfessor({ ...professor, idade: +e.target.value })}
        placeholder="Idade do Professor"
        required
      />
      <input
        name="disciplina"
        value={professor.disciplina}
        onChange={(e) => setProfessor({ ...professor, disciplina: e.target.value })}
        placeholder="Disciplina"
        required
      />

      {/* Aula e motivo */}
      <input
        name="aula"
        value={aula}
        onChange={(e) => setAula(e.target.value)}
        placeholder="Aula"
        required
      />
      <input
        name="motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="Motivo"
        required
      />

      <div style={{ marginTop: 10 }}>
        <button type="submit">{editing ? "Salvar" : "Registrar"}</button>
        {editing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
