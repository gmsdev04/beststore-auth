export default {
  namespaced: true,
  state: {
    usuario : {
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      email: '',
      senha: '',
    },
    componente : {
      informacaoSolicitadaDaVez : 'InformacoesPessoais' // primeira pagina
    }
  },
  mutations: {
    setNome(state, payload){
      state.usuario.nome = payload;
    },
    setSobrenome(state, payload){
      state.usuario.sobrenome = payload;
    },
    setEmail(state, payload){
      state.usuario.email = payload;
    },
    setSenha(state, payload){
      state.usuario.senha = payload;
    },
    setInformacaoSolicitadaDaVez(state,payload){
      state.componente.informacaoSolicitadaDaVez = payload;
    }
  },
  actions: {
  },
  modules: {
  },
}