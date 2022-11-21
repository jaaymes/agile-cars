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
  direction?: string;
  order?: string;
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

export const getProducts2 = async ({
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
  ordenar,
  direcao,
  pageSize = 10,
}: IGetProducts) => {
  try {
    const response = await api.post(`/veiculo/pesquisar2?page=${page}&pagesize=${pageSize}`,{
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
      ordenar,
      direcao,
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

interface IGetMarcas {
  ordenar?: string | null;
  direcao?: string | null;
}

export const getMarcas = async ({
  ordenar,
  direcao,
}: IGetMarcas) => {
  try {
    const response = await api.get(`/marca/PesquisarSemPaginacao?ordenar=${ordenar || 'descricaoMarca'}&direcao=${direcao || 'asc'}`, );
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const getMarca = async (id: number) => {
  try {
    const response = await api.get(`/marca/obter?id=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const createMarca = async ({
  descricaoMarca,
  idMarca
}: {
  descricaoMarca: string
  idMarca?: number
}) => {
  try {
    const response = await api.post(`/marca/detalhe`, {
      descricaoMarca,
      idMarca
    });
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const deleteMarca = async (id: number) => {
  try {
    const response = await api.delete(`/marca/excluir?id=${id}`);
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

export const getModelo = async (id: number) => { 
  try {
    const response = await api.get(`/modelo/obter?id=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const createModelo = async ({ 
  descricaoModelo,
  idMarca,
  idModelo
}: {
    descricaoModelo: string
    idMarca: number
    idModelo?: number
}) => { 
  try {
    const response = await api.post(`/modelo/detalhe`, {
      descricaoModelo,
      idMarca,
      idModelo
     });
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

export const getModeloVersao = async (id: number) => { 
  try {
    const response = await api.get(`/modeloversao/obter?id=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const deleteModeloVersao = async (id: number) => { 
  try {
    const response = await api.delete(`/modeloversao/excluir?id=${id}`);
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}

export const createModeloVersao = async ({
  descricaoModeloVersao,
  idModelo,
  idModeloVersao,
  idMarca
}: {
  descricaoModeloVersao: string
    idModelo: number
  idMarca: number
  idModeloVersao?: number
  }) => { 
  try {
    const response = await api.post(`/modeloversao/detalhe`, {
      descricaoModeloVersao,
      idModelo,
      idModeloVersao,
      idMarca
     });
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
  renavam: number;
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
}: { idFranqueado: number, id: number }) => {
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
  direction,
  order
}: IGetProducts) => {
  try {
    const response = await api.post(`/veiculo/listar?page=${page}&pagesize=${pageSize}`, {
      direcao: direction,
      ordenar: order
    });
    return response.data
  } catch (error) {
    console.error(error);
    // toast.error(error)
  }
}