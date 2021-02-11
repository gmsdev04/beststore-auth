<template>
  <div class="informacoesPessoais">
    <v-row
      v-if="showDescription"
      align="center"
      justify="center"
    >
      <div class="subtitle-1 font-weight-black subTitulo">
        Dados pessoais
      </div>
    </v-row>


    <v-row>
      <v-text-field
        v-model="nome"
        :readonly="readonly"
        :rules="nomeRules"
        class="formField"
        label="Nome"
        required
      />
    </v-row>

    <v-row>
      <v-text-field
        v-model="sobrenome"
        :readonly="readonly"
        :rules="sobrenomeRules"
        class="formField"
        label="Sobrenome"
        required
      />
    </v-row>

    <BotoesDeAcoes v-if="showButtons"
      :esquerdo="false"
      :desativarDireito="!desativarBotaoDireito"
      @direito="proximo"/>
    
  </div>
</template>

<script>
import BotoesDeAcoes from './BotoesDeAcoes.vue'

import { mapMutations, mapState } from 'vuex';

export default {
  components: {BotoesDeAcoes},
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
    },
     showButtons :{
      type: Boolean,
      required: false,
      default: true,      
    },
    desativarBotaoDireito : {
      type: Boolean,
      required: false,
      default: true,    
    }
  },
  data(){
    return {
      nomeRules: [(v) => (!!v || 'Campo obrigatório')],
      sobrenomeRules: [(v) => (!!v || 'Campo obrigatório')],
    }
  },
  computed : {
    ...mapState('Cadastro',['usuario']), //MAPEANDO STATE VUEX
    nome: {
      get(){
        return this.usuario.nome;
      },
      set(valor){
        this.setNome(valor);
      }
    },
    sobrenome: {
      get(){
        return this.usuario.sobrenome;
      },
      set(valor){
        this.setSobrenome(valor);
      }
    }
  },
  methods : {
    ...mapMutations('Cadastro',['setNome','setSobrenome','setInformacaoSolicitadaDaVez' ]), // MAPEANDO MUTATIONS VUEX
    proximo(){
      this.setInformacaoSolicitadaDaVez('InformacoesDeLogin');
    }
  },
}
</script>

<style scoped>
.subTitulo{
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>