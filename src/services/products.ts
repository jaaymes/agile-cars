// import {toast} from 'react-toastify'

import api from "./api";

export const getProducts = async () => {
    try {
      const response = await api.post('/veiculo/pesquisar', {});
      return response.data
    } catch (error) {
      console.error(error);
      // toast.error(error)
    }
  }