export default {
  namespaced: true,
  state: {
    usuario : {
      nome: '',
      sobrenome: '',
      dataNascimento: '',
      email: '',
      senha: '',
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
  },
  actions: {
  },
  modules: {
  },
}