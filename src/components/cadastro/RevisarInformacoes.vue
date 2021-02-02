<template>
  <div class="revisarInformacoes">

    <v-row
          align="center"
          justify="center"
        >
          <div class="subtitle-1 font-weight-black">
            As informações estão corretas
          </div>
        </v-row>

    <InformacoesPessoais readonly :showDescription="false"/>
    <InformacoesDeLogin readonly  :showDescription="false" />

  </div>
</template>

<script>
import InformacoesPessoais from './InformacoesPessoais'
import InformacoesDeLogin from './InformacoesDeLogin'

export default {
  components: {InformacoesPessoais, InformacoesDeLogin}
}
</script>

<style>

</style>