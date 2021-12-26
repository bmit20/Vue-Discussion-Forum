<template>
  <v-container>
    <v-row
        justify="center"
        content="center"
        v-show="!isLoading"
    >
      <v-col
          cols="12"
          md="6"

          v-for="(user, index) in users" :key="index"
      >
        <v-card>
          <v-card-title>
            <strong>{{user.name}}</strong>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
          cols="12"
          md="12"
      >
        <div class="text-center">
          <v-pagination
              v-model="current_page"
              :length="last_page"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <v-row
        justify="center"
        content="center"
        v-show="isLoading"
    >
      <v-col
          cols="12"
          md="12"
      >
        <div class="text-center">
          <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {getLeaderboardsRequest} from "@/requests/User";

export default {
  name: 'Home',
  data: () => ({
    users: [],
    current_page: 1,
    last_page: 1,
    isLoading: true
  }),
  watch: {
    current_page: function (page) {
      getLeaderboardsRequest(page).then(res => {
        this.users = res.data.data;
        this.current_page = res.data.current_page;
        this.last_page = res.data.last_page;
        this.isLoading = false;
      }).catch( err => {
        console.log(err)
        if (err.response.statusCode !== 200) {
          alert("Failed To Load Data!");
        }
      })
    }
  },
  mounted() {
    getLeaderboardsRequest(this.current_page).then(res => {
      this.users = res.data.data;
      this.current_page = res.data.current_page;
      this.last_page = res.data.last_page;
      this.isLoading = false;
    }).catch( err => {
      console.log(err)
      if (err.response.statusCode !== 200) {
        alert("Failed To Load Data!");
      }
    })
  }
}
</script>
