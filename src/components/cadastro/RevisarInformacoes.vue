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
    />
    <InformacoesDeLogin
      readonly
      :show-description="false"
    />
  </div>
</template>

<script>
import InformacoesPessoais from './InformacoesPessoais'
import InformacoesDeLogin from './InformacoesDeLogin'

export default {
  components: {InformacoesPessoais, InformacoesDeLogin}
}
</script>

<style scoped>
.subTitulo{
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>