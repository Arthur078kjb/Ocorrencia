// src/models/Aluno.ts
import { Pessoa } from "./Pessoa";

export class Aluno extends Pessoa {
  constructor(nome: string, idade: number, public turma: string) {
    super(nome, idade);
  }
}
