import api from "./api";

interface IFranqueadoCreate {
  idFranqueado?: number | null;
  descricaoFranqueado: string;
  idSituacao: number;
  cnpj: string;
  cpf: string;
  dataCancelamento: string | undefined | Date;
  dataCadastro?: string | Date;
  logr: string;
  endereco: string;
  nroEndereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  complemento: string;
  whatsapp: string;
}

export const getFranqueados = async () => { 
    try {
      const response = await api.get(`/franqueado/pesquisar`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const getFranqueado = async (id: number) => { 
  try {
    const response = await api.get(`/franqueado/Obter?id=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const deleteFranqueado = async (id: number) => { 
  try {
    const response = await api.delete(`/franqueado/excluir?id=${id}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}


export const createFranqueado = async (data: IFranqueadoCreate) => { 
  const response = await api.post('/franqueado/detalhe', data);
  return response
}
