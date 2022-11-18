import axios from 'axios'

export interface IReturnCEP {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export async function consultCep(cep: string): Promise<IReturnCEP | boolean> {
  if (cep === null) {
    return false
  }

  if (cep.replace(/\D/g, '').length !== 8) {
    return false
  }

  const { data } = await axios.get<IReturnCEP>(
    `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json`
    )

  if (data.erro) {
    return false
  }

  return {
    ...data,
    cep: cep.replace(/\D/g, '')
  }
}
