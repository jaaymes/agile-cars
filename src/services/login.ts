import api from "./api"

const domain = '/account'

const service = {

  async login({  descricaoFuncionario, senha }: { descricaoFuncionario: string, senha: string }) {
  
    return api.post(`${domain}/login`, { descricaoFuncionario, senha })
  
  }

}

export default service