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
            
            <v-row>
              <v-text-field
                v-model="usuario.nome"
                class="formField"
                label="Nome"
                required
              />
            </v-row>

           <v-row>
              <v-text-field
                v-model="usuario.sobrenome"
                class="formField"
                label="Sobrenome"
                required
              />
            </v-row>

            <v-row>
              <v-text-field
                v-model="usuario.email"
                class="formField"
                :rules="emailRules"
                label="E-mail (login)"
                type="mail"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="usuario.senha"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                class="formField"
                label="Senha"
                :rules="senhaRules"
                required
                @click:append="showPassword = !showPassword"
              />
            </v-row>
            <v-row
              align="center"
              justify="center"
              class="btnEntrar"
            >
              <v-btn
                color="green"
                width="82%"
                :disabled="!valid"
                @click="cadastrar"
              >
                Cadastrar
              </v-btn>
            </v-row>
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
export default {
  data() {
    return {
      usuario : {
        senha: '',
        email: '',
      },
      valid: false,
      emailRules: [
        (v) => (!!v || 'Campo obrigatório'),
        (v) => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido')],
      senhaRules: [(v) => (!!v || 'Campo obrigatório')],
      showPassword: false,
    };
  },
  methods: {
    cadastrar() {
      this.$refs.form.validate();
      console.log('validated', this.valid);
    },
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
