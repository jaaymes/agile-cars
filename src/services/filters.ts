// import {toast} from 'react-toastify'

import api from "./api";

// OPCIONAL
export const getOptional = async () => {
    try {
      const response = await api.get('/opcional/pesquisar', {});
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