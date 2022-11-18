import api from "./api";

interface IGetProducts {
  page?: number;
  id?: number;
  idFranqueado?: number;
  idModelo?: number
  idMarca?: number;
  idCategoria?: number;
  idModeloVersao?: number;
  opcionais?: string
  valorInicial?: number;
  valorFinal?: number;
  fabInicial?: number;
  fabFinal?: number;
  kmInicial?: number;
  kmFinal?: number;
  ordenar?: string | null;
  direcao?: string | null;
  pageSize?: number;
}

export const getProducts = async ({
  id,
  idFranqueado,
  page = 1,
  idModelo,
  idMarca,
  idCategoria,
  idModeloVersao,
  opcionais,
  valorInicial,
  valorFinal,
  fabInicial,
  fabFinal,
  kmInicial,
  kmFinal,
  ordenar = null,
  direcao = null,
  pageSize = 10,
}: IGetProducts) => {
  try {
    const response = await api.post(`/veiculo/pesquisar?page=${page}&pagesize=${pageSize}${ordenar === null ? '&ordenar=valor' : `&ordenar=${ordenar}`} ${direcao === null ? '&direcao=asc' : `&direcao=${direcao}`}`, {
      idVeiculo: id,
      idFranqueado: idFranqueado,
      idModelo,
      idMarca,
      idCategoria,
      idModeloVersao,
      opcionais,
      valorInicial,
      valorFinal,
      fabInicial,
      fabFinal,
      kmInicial,
      kmFinal,
    }
    );
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getProduct = async ({
  id,
  idFranqueado
}: { id: number, idFranqueado: number }) => {
  try {
    const response = await api.get(`/veiculo/obter?id=${id}&idFranqueado=${idFranqueado}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getMarcas = async () => {
  try {
    const response = await api.get(`/marca/PesquisarSemPaginacao`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getModelos = async (id: number) => {
  try {
    const response = await api.get(`/modelo/PesquisarSemPaginacao?idMarca=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getModelosVersao = async (id: number) => {
  try {
    const response = await api.get(`/modeloversao/PesquisarSemPaginacao?idModelo=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

interface ICreateVeiculo {
  idVeiculo?: number;
  idFranqueado: number;
  idModelo: number;
  idMarca: number;
  idCategoria: number;
  idModeloVersao: number;
  opcionais: string | undefined;
  valor: number;
  fab: number;
  mod: number;
  km: number;
  obs: string;
  chassi: string;
  placa: string;
  cor: string;
  renavam: string;
  foto1?: string | undefined;
  foto2?: string | undefined;
  foto3?: string | undefined;
  foto4?: string | undefined;
  foto5?: string | undefined;
  foto6?: string | undefined;
  foto7?: string | undefined;
  foto8?: string | undefined;
}

export const createVeiculos = async (data: ICreateVeiculo) => {
  try {
    const response = await api.post(`/veiculo/detalhe`, data);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const updateVeiculos = async (data: ICreateVeiculo) => {
  try {
    const response = await api.post(`/veiculo/detalhe`, data);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const deleteVeiculo = async (id: number, idFranqueado: number) => {
  try {
    const response = await api.delete(`/veiculo/excluir?id=${id}&idFranqueado=${idFranqueado}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getOpcionais = async ({
  idFranqueado,
  id
}: {idFranqueado: number, id: number}) => { 
  try {
    const response = await api.get(`/veiculo/ObterOpcionais?idveiculo=${id}&idfranqueado=${idFranqueado}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getProductsList = async ({
  page = 1,
  pageSize = 10,
}: IGetProducts) => {
  try {
    const response = await api.post(`/veiculo/listar?page=${page}&pagesize=${pageSize}`, {});
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}