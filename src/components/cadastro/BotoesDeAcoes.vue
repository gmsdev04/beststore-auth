<template>
  <div class="botoesDeAcoes">
    <v-row
      align="center"
      justify="center"
      class="btnEntrar"
    >
      <v-col 
        v-if="esquerdo" 
        class="d-flex justify-center"
        cols="12"  
        :md="MdCols"
      >
        <v-btn
          :disabled="desativarEsquerdo"
          plain
          color="green"
          @click="$emit('esquerdo')"
        >
          {{ botaoEsquerdoTexto }}
        </v-btn>
      </v-col>
        
      <v-col 
        v-if="direito" 
        class="d-flex justify-center" 
        cols="12" 
        :md="MdCols"
      >
        <v-btn
          :disabled="desativarDireito"
          plain
          color="green"
          @click="$emit('direito')"
          @keyup.enter="proximo"
        >
          {{ botaoDireitoTexto }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props : {
    botaoEsquerdoTexto : {
      type: String,
      required: false,
      default: 'Anterior' 
    },
    botaoDireitoTexto : {
      type: String,
      required: false,
      default: 'Proximo'
    },
    direito : {
      type: Boolean,
      required: false,
      default: true
    },
    esquerdo : {
      type: Boolean,
      required: false,
      default: true
    },
    desativarDireito : {
      type: Boolean,
      required: false,
      default: false
    },
    desativarEsquerdo : {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed : {
    ...mapState('Cadastro',['componente']),
    MdCols(){
      return (this.esquerdo == false || this.direito == false) ? 12 : 4;  
    },
    
  }

}
</script>

<style>

</style>