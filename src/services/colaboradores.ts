import { toast } from "react-toastify";

import api from "./api";


interface IColaboradorGet { 
  idFranqueado?: number | null;
}

interface IColaboradorPost { 
  idFranqueado?: number | null;
  idSituacao?: number | null;
  idFuncionario?: number | null;
  dataCadastro?: Date | string | number;
  descricaoFuncionario: string;
  imagem: string;
  senha?: string;
  email: string;
  foneCelular: string;
}

interface IColaboradorUpdate {
  idFranqueado?: number | null;
  idSituacao?: number | null;
  idFuncionario?: number | null;
  descricaoFuncionario: string;
  imagem: string;
  senha?: string;
  email: string;
  foneCelular: string;
}

export const getColaboradores = async ({
  idFranqueado = 1
}: IColaboradorGet) => {
 try {
  const response = await api.get(`/funcionario/pesquisar?idFranqueado=${idFranqueado}`);
   return response.data;
   
 } catch (error) {
  console.log(error)
 }
}

export const getColaborador = async (id: number, idFranqueado: number) => { 
  try {
    const response = await api.get(`/funcionario/Obter?id=${id}&idFranqueado=${idFranqueado}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const createColaborador = async (data: IColaboradorPost) => { 
    const response = await api.post('/funcionario/detalhe', data);
    return response
}

export const updateColaborador = async (data: IColaboradorPost) => { 
    const response = await api.post('/funcionario/detalhe', data);
    return response
}

// delete colaborador
export const deleteColaborador = async (id: number, idFranqueado: number) => { 
  try {
    const response = await api.delete(`/funcionario/excluir?id=${id}&idFranqueado=${idFranqueado}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}