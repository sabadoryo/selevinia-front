<template>
   <v-app-bar app>
    <v-app-bar-title>
      {{title}}
    </v-app-bar-title>
    <v-spacer>
    </v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

export default {
  name : 'AppHeader',

  computed: {
    title() {
      console.log('lol')
      return this.$store.state.headerTitle
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$store.commit('setAuth', false)
      this.$router.push('/login')
    }
  }
}
</script>
