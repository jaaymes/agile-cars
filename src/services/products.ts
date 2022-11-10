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
}: IGetProducts) => {
    try {
      const response = await api.post(`/veiculo/pesquisar?page=${page}&pagesize=10${ordenar === null ? '&ordenar=valor' : `&ordenar=${ordenar}` } ${direcao === null ? '&direcao=asc' : `&direcao=${direcao}` }`, {
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
      });
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}
  

export const getProduct = async (id: number, idFranqueado: number) => {
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