<template>
  <v-app>
    <!-- Sidebar -->
    <app-sidebar v-if="authenticated"/>
    
    <!-- Header -->
    <app-header v-if="authenticated"/>

    <!-- Main -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.isActive"
      :timeout="3000"
      :color="snackbar.color"
      rounded="pill"
      bottom
    >
      {{snackbar.message}}
    </v-snackbar>

    <!-- Overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import AppHeader from './components/layout/Header.vue'
import AppSidebar from './components/layout/Sidebar.vue'

export default {
  name: 'App',

  components: {
   AppHeader,
   AppSidebar
  },

  data: () => ({
  
  }),

  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    overlay() {
      return this.$store.state.overlay
    },
    authenticated() {
      return this.$store.state.authenticated
    }
  },
  methods: {
    checkAuth() {
      if (!localStorage.getItem('jwt')) {
        this.$store.commit('setAuth', false)
      } else {
        this.$store.commit('setAuth', true)
      }
    }
  },
  mounted() {
    // this.checkAuth()
  }
};
</script>
