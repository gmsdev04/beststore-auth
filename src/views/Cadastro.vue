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
        shaped
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
              <div class="text-h5">
                Criar conta
              </div>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <div class="subtitle-1">
                Cadastre-se para acessar o BestStore!
              </div>
            </v-row>
            
            <v-row
              align="center"
              justify="center"
            >
              <div class="subtitle-1">
                {{ mensagemSolicitacaoDados }}
              </div>
            </v-row>
            

            <!-- DADOS SOLICITADOS -->
            <component :is="informacaoSolicitadaDaVez"></component>
            
            <!-- BOTAO CADASTRAR -->
           
            <v-row
              align="center"
              justify="center"
              class="btnEntrar"
              v-if="informacaoSolicitadaDaVez == 'informacoesPessoais' "
            
            >
              <v-btn
                plain
                color="green"
                :disabled="!valid"
                @click="proximo"
              >
                Próximo
              </v-btn>

            </v-row>

            <v-row
              align="center"
              justify="center"
              class="btnEntrar"
              v-else
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
                plain
                v-if="informacaoSolicitadaDaVez == 'RevisarInformacoes'"
                color="green"
                width="45%"
                :disabled="!valid"
                @click="proximo"
              >
                Cadastrar
              </v-btn>

              <v-btn
                plain
                v-else
                color="green"
                width="45%"
                :disabled="!valid"
                @click="proximo"
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
                <div class="subtitle-2">
                 Já possui conta ? Entre!
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import informacoesDeLogin from '../components/cadastro/InformacoesDeLogin.vue'
import informacoesPessoais from '../components/cadastro/InformacoesPessoais.vue'
import RevisarInformacoes from '../components/cadastro/RevisarInformacoes.vue'

export default {
  components: {informacoesDeLogin,informacoesPessoais,RevisarInformacoes},
  data() {
    return {
      valid: false,
      informacaoSolicitadaDaVez: 'informacoesPessoais',
    };
  },
  computed : {
    mensagemSolicitacaoDados(){
      let mensagem = '';

      switch(this.informacaoSolicitadaDaVez){
        case 'informacoesDeLogin' : mensagem = 'Dados de acesso'; break;
        case 'informacoesPessoais': mensagem = 'Dados pessoais'; break;
        case 'RevisarInformacoes': mensagem = 'As informações estão corretas ?'
      }

      return mensagem;
    }
  },
  methods: {
    cadastrar() {
      this.$refs.form.validate();
      console.log('validated', this.valid);
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

<style>
.formField {
  padding-left: 10%;
  padding-right: 10%;
}
.btnEntrar{
  padding-top: 5%;
}
</style>
