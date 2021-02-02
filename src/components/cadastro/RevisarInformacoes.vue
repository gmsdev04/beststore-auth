<template>
  <div class="revisarInformacoes">
    <InformacoesPessoais readonly/>
    <InformacoesDeLogin readonly/>

  </div>
</template>

<script>
import InformacoesPessoais from './InformacoesPessoais'
import InformacoesDeLogin from './InformacoesDeLogin'

export default {
  components: {InformacoesPessoais,InformacoesDeLogin}
}
</script>

<style>

</style>