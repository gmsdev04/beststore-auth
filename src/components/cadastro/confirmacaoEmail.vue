<template>
 <div class="confirmacaoEmail">
    <v-row
      v-if="showDescription"
      align="center"
      justify="center"
    >
      <div class="subtitle-1 font-weight-black subTitulo">
        Confirmação de e-mail
      </div>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
        <div class="subtitle-1">
          Foi enviado um código para o e-mail
      </div>
    </v-row>

     <v-row
      align="center"
      justify="center"
    >
        <div class="subtitle-1">
          {{usuario.email}}
      </div>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="6" md="6">
        <v-text-field
          v-model="codigoConfirmacao"
          type="text"
          label="Código validação"
          :rules="[(v) => (!!v || 'Código obrigatório')]"
          required
          outlined
        />
      </v-col>
    </v-row>

    <BotoesDeAcoes 
    @direito="confirmar"
    :desativarDireito="!desativarBotaoDireito"
    :esquerdo="false"
    botaoDireitoTexto="Confirmar!"/>
  </div>
</template>

<script>

import BotoesDeAcoes  from './BotoesDeAcoes.vue'

import cognito from '../../cognito/CognitoAdapter'

import { mapState } from 'vuex'

export default {
  components : {BotoesDeAcoes},
  props : {
    showDescription : {
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
      codigoConfirmacao : ''
    }
  },
  computed : {
    ...mapState('Cadastro',['usuario']),
  },
  methods : {
    confirmar(){
      cognito.confirmEmail(this.usuario,this.codigoConfirmacao)
      .then(() => this.$router.push({name:'login'}))
      .catch(error => {
        switch(error['code']){
          case 'CodeMismatchException' : this.codigoInvalido(); break;
          default: alert(error.message); break;
        }
      });
    },
    codigoInvalido(){
      this.codigoConfirmacao = ''
    }
  }
}
</script>

<style>
.subTitulo{
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>