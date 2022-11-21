import api from "./api";

// OPCIONAL
export const getOptionais = async ({
  ordenar,
  direcao,
}: {
    ordenar?: string | null;
    direcao?: string | null;
}) => {
    try {
      const response = await api.get(`/opcional/pesquisar?ordenar=${ordenar || 'descricaoOpcional'}&direcao=${direcao || 'asc'}`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const getOpcional = async (id: number) => { 
    try {
      const response = await api.get(`/opcional/Obter?id=${id}`);
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const createOptional = async ({ 
  descricaoOpcional,
  idOpcional
}: {
    descricaoOpcional: string
    idOpcional?: number
}) => { 
    try {
      const response = await api.post('/opcional/detalhe', {
        descricaoOpcional,
        idOpcional
      });
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}

export const deleteOptional = async (id: number) => { 
    try {
      const response = await api.delete(`/opcional/excluir?id=${id}`, {});
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}
  
// CATEGORIA
export const getCategory = async () => { 
    try {
      const response = await api.get('/categoria/pesquisar', {});
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
}