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

          v-for="(thread, index) in threads" :key="index"
      >
        <v-card>
          <v-card-title>
            <router-link :to="'/thread/'+thread.slug" class="text-decoration-none black--text">
              <h2>{{thread.title}}</h2>
            </router-link>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>{{ thread.user.name }}</p>
              </v-col>
              <v-col>
                <p class="text-right">{{ thread.created_at }}</p>
              </v-col>
            </v-row>
          </v-card-text>
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
import {threadsListRequest} from "@/requests/Threads";

export default {
  name: 'Home',
  data: () => ({
    threads: [],
    current_page: 1,
    last_page: 1,
    isLoading: true
  }),
  watch: {
    current_page: function (page) {
      threadsListRequest(page).then(res => {
        this.threads = res.data.data;
        this.current_page = res.data.current_page;
        this.last_page = res.data.last_page;
        this.isLoading = false;
      }).catch( err => {
        console.log(err)
        if (err.response.statusCode !== 200) {
          alert("Failed TO Load Data!");
        }
      })
    }
  },
  mounted() {
    threadsListRequest(this.current_page).then(res => {
      this.threads = res.data.data;
      this.current_page = res.data.current_page;
      this.last_page = res.data.last_page;
      this.isLoading = false;
    }).catch( err => {
      console.log(err)
      if (err.response.statusCode !== 200) {
        alert("Failed TO Load Data!");
      }
    })
  }
}
</script>
