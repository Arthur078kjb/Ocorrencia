// src/models/types.ts

export interface Pessoa {
  nome: string;
  idade: number;
}

export interface Aluno extends Pessoa {
  turma: string;
}

export interface Professor extends Pessoa {
  disciplina: string;
}

export interface Ocorrencia {
  aluno: Aluno;
  professor: Professor;
  motivo: string;
  aula: string;
}
