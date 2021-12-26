<template>
  <v-container
      fluid
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col
          cols="12"
          sm="8"
          md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
              color="primary"
              dark
              flat
          >
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Name"
                  name="name"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="name"
              ></v-text-field>

              <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
              ></v-text-field>

              <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="sendRegisterRequest">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {registerRequest} from "@/requests/Auth";

export default {
  name: "Register",
  data: () => ({
    name: null,
    email: null,
    password: null
  }),

  methods: {
    sendRegisterRequest() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      registerRequest(formData).then( res => {
        this.$router.push('/login')
      }).catch( err => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>