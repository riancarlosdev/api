interface bodyUser {
  nome: string
  sobrenome: string
  email: string
  data_nascimento: string
  cpf: string
  senha: string
  confirm_senha: string
  telefone?: string
  whatsapp?: string
}

export { bodyUser };
