<template>
  <v-container 
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-card
        class="mx-auto"
        width="400"
        rounded
      >
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-row
              align="center"
              justify="center"
            >
              <div class="text-h6 font-weight-black green--text">
                Criar conta
              </div>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <div class="subtitle-1">
                Cadastre-se para acessar o  BestStore!
              </div>
            </v-row>
      
            <!-- DADOS SOLICITADOS -->
            <transition
              mode="out-in" 
              enter-active-class="animate__animated animate__fadeIn animate-speed"
              leave-active-class="animate__animated animate__fadeOut animate-speed"
            >
              <component
                :is="informacaoSolicitadaDaVez"
                :desativar-botao-direito="valid"
              />
            </transition>
  
            <v-row>
              <v-col
                justify="center"
                align="center"
              >
                <router-link
                  to="/login"
                  tag="a"
                  class="subtitle-2 "
                >
                  Já possui conta ? Entre!
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import InformacoesDeLogin from '../components/cadastro/InformacoesDeLogin'
import InformacoesPessoais from '../components/cadastro/InformacoesPessoais'
import RevisarInformacoes from '../components/cadastro/RevisarInformacoes'
import ConfirmacaoEmail from '../components/cadastro/ConfirmacaoEmail'



export default {
  components: {InformacoesDeLogin,InformacoesPessoais,RevisarInformacoes,ConfirmacaoEmail},
  data() {
    return {
      valid: false,
      };
  },
  computed : {
    ...mapState('Cadastro',['componente']), //MAPEANDO STATE VUEX
    informacaoSolicitadaDaVez(){
      get : {
        return this.componente.informacaoSolicitadaDaVez;
      }
    }
  },
};
</script>

<style scoped>
.formField {
  padding-left: 10%;
  padding-right: 10%;
}
.btnEntrar{
  padding-top: 5%;
}
.animate-speed {
  --animate-duration: 0.15s;
}
</style>
