<template>
  <div class="informacoesDeLogin">
    <v-row
      v-if="showDescription"
      align="center"
      justify="center"
    >
      <div class="subtitle-1 font-weight-black subTitulo">
        Dados de acesso
      </div>
    </v-row>
    <v-row>
      <v-text-field
        v-model="email"
        :readonly="readonly"
        class="formField"
        :rules="emailRules"
        label="E-mail (login)"
        type="mail"
        required
      />
    </v-row>
    <v-row>
      <v-text-field
        v-model="senha"
        :readonly="readonly"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        class="formField"
        label="Senha"
        :rules="senhaRules"
        required
        @click:append="showPassword = !showPassword"
      />
    </v-row>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  props:{
    readonly : {
      type: Boolean,
      required: false,
      default: false,
    },
    showDescription : {
      type: Boolean,
      required: false,
      default: true,      
    }
  },
  data(){
    return {
      
        emailRules: [
        (v) => (!!v || 'Campo obrigatório'),
        (v) => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido')],
        senhaRules: [ 
                    v => !!v || 'Campo obrigatório',
                    v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(v) || 'Deve conter maiúscula, minúscula, números e 8 caracteres',
                     ],
        showPassword: false,
    }
  },
  computed : {
    ...mapState('Cadastro',['usuario']),
    email : {
      get(){
        return this.usuario.email;
      },
      set(valor){
        this.setEmail(valor);
      },
    },
    senha : {
      get(){
        return this.usuario.senha;
      },
      set(valor){
        this.setSenha(valor);
      },
    }    
  },
  methods: {
    ...mapMutations('Cadastro',['setEmail','setSenha'])
  }
}
</script>

<style scoped>
.subTitulo{
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>