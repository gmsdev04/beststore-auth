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
        height="320"
        width="400"
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
              <div class="text-h5 green--text">
                Fazer Login
              </div>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
              <div class="subtitle-1">
                Use sua conta BestStore
              </div>
            </v-row>
            <v-row>
              <v-text-field
                v-model="login.email"
                class="formField"
                :rules="emailRules"
                label="E-mail"
                type="mail"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                v-model="login.senha"
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
                @click="logar"
              >
                Entrar
              </v-btn>
            </v-row>
            <v-row>
              <v-col
                justify="center"
                align="center"
              >
                 <div class="subtitle-2">
                  Esqueceu a senha ?
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
import cognito from '../cognito/CognitoAdapter'

export default {
  data() {
    return {
      login : {
        senha: '',
        email: ''
      },
      redirectUri : this.$route.query.redirect_uri,
      valid: false,
      emailRules: [
        (v) => (!!v || 'Campo obrigatório'),
        (v) => (!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido')],
      senhaRules: [(v) => (!!v || 'Campo obrigatório')],
      showPassword: false,
    };
  },
  methods: {
    logar() {
      this.$refs.form.validate();
      cognito.authenticate(this.login)
      .then(result => {
        window.location = this.redirectUri;
      })
      .catch(error => {
        switch(error.code){
          case 'NotAuthorizedException': alert("Usuário ou senha inválido"); break;
          case 'UserNotConfirmedException': console.log('redirect to confirm page'); break;
          default: alert(error.message); console.error(error); break;
        }
      });
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
