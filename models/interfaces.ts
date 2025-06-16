export interface Aluno {
  nome: string;
  idade: number;
  turma: string;
}

export interface Professor {
  nome: string;
  idade: number;
  disciplina: string;
}

export interface Ocorrencia {
  aluno: Aluno;
  professor: Professor;
  motivo: string;
  aula: string;
}
