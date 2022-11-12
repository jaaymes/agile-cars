import api from "./api";


interface IColaborador { 
  idFranqueado?: number | null;
}

export const getColaboradores = async ({
  idFranqueado = 1
}: IColaborador) => {
 try {
  const response = await api.get(`/funcionario/pesquisar?idFranqueado=${idFranqueado}`);
   return response.data;
   
 } catch (error) {
  console.log(error)
 }
}