import api from "./api";

export const getProducts = async (id?: number, idFranqueado?: number) => {
    try {
      const response = await api.post(`/veiculo/pesquisar`, {
        idVeiculo: id,
        idFranqueado: idFranqueado
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
      const response = await api.get(`/marca/pesquisar`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const getModelos = async () => { 
    try {
      const response = await api.get(`/modelo/pesquisar`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const getModelosVersao = async () => { 
    try {
      const response = await api.get(`/modeloversao/pesquisar`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}