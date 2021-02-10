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
              <component :is="informacaoSolicitadaDaVez" />
            </transition>
            <!-- BOTAO CADASTRAR -->
           
            <v-row
              v-if="informacaoSolicitadaDaVez == 'informacoesPessoais' "
              align="center"
              justify="center"
              class="btnEntrar"
            >
              <v-btn
                plain
                color="green"
                :disabled="!valid"
                @click="proximo"
                @keyup.enter="proximo"
              >
                Próximo
              </v-btn>
            </v-row>

            <v-row
              v-else
              align="center"
              justify="center"
              class="btnEntrar"
            >
              <v-btn
                plain
                color="green"
                width="45%"
                @click="anterior"
              >
                Anterior
              </v-btn>

              <v-btn
                v-if="informacaoSolicitadaDaVez == 'RevisarInformacoes'"
                plain
                color="green"
                width="45%"
                :disabled="!valid"
                @click="cadastrar"
                @keyup.enter="proximo"
              >
                Cadastrar!
              </v-btn>

              <v-btn
                v-else
                plain
                color="green"
                width="45%"
                :disabled="!valid"
                @click="proximo"
                @keyup.enter="proximo"
              >
                Próximo
              </v-btn>
            </v-row>
            
            <!-- ANTERIOR - PROXIMO -->
           
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

import { mapState } from 'vuex';
import informacoesDeLogin from '../components/cadastro/InformacoesDeLogin.vue'
import informacoesPessoais from '../components/cadastro/InformacoesPessoais.vue'
import RevisarInformacoes from '../components/cadastro/RevisarInformacoes.vue'

import * as cognito from '../cognito/CognitoAdapter'


export default {
  components: {informacoesDeLogin,informacoesPessoais,RevisarInformacoes},
  data() {
    return {
      valid: false,
      informacaoSolicitadaDaVez: 'informacoesPessoais',
      };
  },
  computed : {
    ...mapState('Cadastro',['usuario']), //MAPEANDO STATE VUEX
  },
  methods: {
    cadastrar() {
      cognito.registerUser(this.usuario)
        .then(result => console.log(result))
        .catch(error => {
            switch(error['code']){
              case 'UsernameExistsException': this.emailJaExiste();  break;
              default: alert(error.message); break;
            }
          }
        );
    },
    emailJaExiste(){
      alert('E-mail ja cadastrado');
      this.usuario.email = '';
      this.informacaoSolicitadaDaVez = 'informacoesDeLogin';
    },
    proximo(){
      let proxima = '';
      switch(this.informacaoSolicitadaDaVez){
        case 'informacoesPessoais' : proxima = 'informacoesDeLogin'; break;
        case 'informacoesDeLogin' : proxima = 'RevisarInformacoes'; break;
      }

      this.informacaoSolicitadaDaVez = proxima;
    },
    anterior(){
      let anterior = '';
      switch(this.informacaoSolicitadaDaVez){
        case 'informacoesDeLogin' : anterior = 'informacoesPessoais'; break;  
        case 'RevisarInformacoes' : anterior = 'informacoesDeLogin'; break;
      } 

      this.informacaoSolicitadaDaVez = anterior;

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
