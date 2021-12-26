<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
        />
      </div>
      <router-link to="/leaderboards">
        <span class="mr-2" style="color:white !important;">Leaderboards</span>
      </router-link>
      <v-spacer></v-spacer>

      <div v-if="!isAuth">
        <router-link to="/register">
          <v-btn
              text
          >
            <span class="mr-2">Register</span>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/login">
          <v-btn
              text
          >
            <span class="mr-2">Login</span>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </router-link>
      </div>
      <div v-if="isAuth">
        {{ userData.name }}
        <v-btn
            light
            class="ml-3"
            @click="sendLogoutRequest"
        >
          Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-fab-transition>
      <v-btn
          color="pink"
          fab
          large
          dark
          bottom
          left
          class="v-btn--example ml-5 mb-5"
          to="/create/thread"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>

import {checkAuth, getUserDataRequest, logoutRequest} from "@/requests/Auth";

export default {
  name: 'App',

  data: () => ({
    isAuth: false,
    userData: {
      name: null
    }
  }),
  methods: {
    sendLogoutRequest() {
      logoutRequest().then(res => {
        this.$router.push('/')
        this.isAuth = false;
        localStorage.setItem('isAuth', 'false');
      })
    }
  },
  mounted() {
    checkAuth();
    this.isAuth = localStorage.getItem('isAuth') === 'true';
    if (this.isAuth) {
      getUserDataRequest().then(res => {
        this.userData = res.data[0]
      })
    }
  }
};
</script>
