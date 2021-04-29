<template>
  <div class="revisarInformacoes">
    <v-row
      align="center"
      justify="center"
    >
      <div class="subtitle-1 font-weight-black subTitulo">
        As informações estão corretas ?
      </div>
    </v-row>

    <InformacoesPessoais
      readonly
      :show-description="false"
      :show-buttons="false"
    />
    <InformacoesDeLogin
      readonly
      :show-description="false"
      :show-buttons="false"
    />

    <BotoesDeAcoes 
      :desativar-direito="!desativarBotaoDireito"
      botao-direito-texto="Cadastrar!"
      @esquerdo="anterior"
      @direito="cadastrar"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BotoesDeAcoes from './BotoesDeAcoes.vue'
import InformacoesDeLogin from './InformacoesDeLogin.vue'
import InformacoesPessoais from './InformacoesPessoais.vue'

import cognito from '../../cognito/CognitoAdapter'

export default {
  components: {InformacoesPessoais, InformacoesDeLogin, BotoesDeAcoes},
   
  props: {
    desativarBotaoDireito : {
      type: Boolean,
      required: false,
      default: true,    
    }
  },
  computed : {
    ...mapState('Cadastro',['usuario','componente']), //MAPEANDO STATE VUEX
  },
  methods: {
    ...mapMutations('Cadastro',['setInformacaoSolicitadaDaVez']),
    anterior(){
       this.setInformacaoSolicitadaDaVez('InformacoesDeLogin')
    },
    cadastrar() {
      console.log('cadastro');
      cognito.registerUser(this.usuario)
        .then(result => {
          console.log('result pós cadastro ->',result);
          this.setInformacaoSolicitadaDaVez('ConfirmacaoEmail')
        } 
        ).catch(error => {
            switch(error['code']){
              case 'UsernameExistsException': this.emailJaExiste(); break;
              default: alert(error.message); break;
            }
          }
        )
      },
    emailJaExiste(){
      alert('E-mail ja cadastrado');
      this.usuario.email = '';
      this.setInformacaoSolicitadaDaVez('informacoesDeLogin')
    }
  }
}
</script>

<style scoped>
.subTitulo{
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>