<template>
  <div class="informacoesPessoais">
    <v-row>
      <v-text-field
        :readonly="readonly"
        v-model="nome"
        class="formField"
        label="Nome"
        required
      />
    </v-row>

    <v-row>
      <v-text-field
        :readonly="readonly"
        v-model="sobrenome"
        class="formField"
        label="Sobrenome"
        required
      />
    </v-row>


  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props:{
    readonly : {
      type: Boolean,
      required: false,
      default: false,
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
    ...mapMutations('Cadastro',['setNome','setSobrenome']), // MAPEANDO MUTATIONS VUEX
  },
}
</script>

<style>

</style>