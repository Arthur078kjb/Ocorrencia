import React, { useState } from "react";

interface Props {
  onLogin: (nome: string) => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Exemplo simples de validação de senha:
    const senhaCorreta = "1234";

    if (!nome) {
      setErro("Informe o nome do usuário");
      return;
    }

    if (senha !== senhaCorreta) {
      setErro("Senha incorreta");
      return;
    }

    setErro("");
    onLogin(nome);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Nome de usuário"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
      />

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button type="submit" style={{ padding: "10px 20px", marginTop: 10 }}>
        Entrar
      </button>
    </form>
  );
};
