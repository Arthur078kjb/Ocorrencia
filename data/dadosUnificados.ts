// src/data/dadosUnificados.ts
import { Aluno } from "../models/Aluno";
import { Professor } from "../models/Professor";
import { Ocorrencia, Aluno as AlunoInterface, Professor as ProfessorInterface } from "../models/types";

// Instâncias das classes
const aluno = new Aluno("",0,"");
const professor = new Professor("",0 , "");

// Objeto Ocorrência (usando interfaces, para flexibilidade)
const ocorrencia: Ocorrencia = {
  aluno: aluno,
  professor: professor,
  motivo: "",
  aula: ""
};

// Exportando os dados
export const dadosUnificados = {
  aluno,
  professor,
  ocorrencia,
};
