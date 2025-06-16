// src/models/Professor.ts
import { Pessoa } from "./Pessoa";

export class Professor extends Pessoa {
  constructor(nome: string, idade: number, public disciplina: string) {
    super(nome, idade);
  }
}
// O Professor herda de Pessoa e adiciona a propriedade disciplina