import api from "./api";

export const getFranqueados = async () => { 
    try {
      const response = await api.get(`/franqueado/pesquisar`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}