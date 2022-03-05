<template>
<v-card style="margin: auto;
width: 60%;
border: 1px solid;
padding: 10px;" max-width="500px">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      type="email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Пароль"
      required
      type="password"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="primary"
      @click="login"
    >
      Войти
    </v-btn>
 </v-form>
</v-card>
</template>

<script>
export default {
  name : 'LoginComponent',
  data: () => ({
    valid: null,
    email: '',
    emailRules: [
      v => !!v || 'E-mail обязтальное поле',
      v => /.+@.+\..+/.test(v) || 'E-mail должен быть действительным',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Пароль обязтальное поле',
    ],
  }),
  methods: {
    login() {
      this.$http.post('/api/admin/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('jwt', res.data.access_token)
        console.log(res)
        this.$store.commit('setAuth', true)
        this.$router.push('/')
      }).catch(err => {
        this.$store.commit('toggleSnackbar', {message: err.message, color : 'red'})
      })
    }
  }
}
</script>

<style>

</style>