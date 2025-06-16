import { Aluno } from "./Aluno";
import { Professor } from "./Professor";

export interface Ocorrencia {
  aluno: Aluno;
  professor: Professor;
  aula: string;
  motivo: string;
}
