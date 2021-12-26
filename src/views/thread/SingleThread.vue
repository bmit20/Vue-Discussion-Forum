<template>
  <v-container>
    <v-row
        justify="center"
        content="center"
    >
      <v-col
          cols="12"
          md="8"
      >
        <v-card
            outlined
        >
          <v-card-title>
            <v-row>
              <v-col
                  cols="6"
                  md="6"
              >
                <h2>{{ thread.title }}</h2>
              </v-col>
              <v-col
                  cols="6"
                  md="6"
                  v-if="userCanDelete"
              >
                <v-btn
                    color="red"
                    @click="deleteThread"
                    class="text-right"
                >
                  Delete
                </v-btn>
              </v-col>
            </v-row>

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
            <vue-markdown v-html="thread.content"></vue-markdown>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          md="8"
      >
        <v-row>
          <v-col><h2>Replies: </h2></v-col>
          <v-col
              class="text-right"
              v-if="isAuth"
          >
            <v-btn
                ripple
                to="#"
                color="green"
                dark
                @click="showReplyBox = !showReplyBox"
            >
              Reply
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
          cols="12"
          md="8"
          v-if="showReplyBox"
      >
        <v-card
            outlined
        >
          <v-card-title>
            <v-row class="ml-6">
              <v-col
                  cols="6"
                  md="6"
              >
                <h5>Submit New Reply</h5>
              </v-col>
              <v-col
                  cols="6"
                  md="6"
                  class="text-right"
              >
                <v-btn
                    color="red"
                    dark
                    @click="showReplyBox = false"
                >
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-textarea
                  label="Content"
                  outlined
                  rows="12"
                  v-model="replyData.content"
              ></v-textarea>
              <v-btn
                  color="blue"
                  dark
                  @click="submitNewReply"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          md="8"
          v-if="thread.answers.length > 0"
      >
        <v-row>
          <v-col
              cols="12"
              md="12"
              v-for="(answer, index) in thread.answers" :key="index"
          >
            <v-card
                outlined
            >
              <v-card-title>
                <v-avatar
                    color="orange"
                    size="62"
                >
                  MB
                </v-avatar>
                <v-row class="ml-6">
                  <v-col
                      cols="12"
                      md="12"
                  >
                    <h5>{{ answer.user.name }}</h5>
                  </v-col>
                  <v-col
                      cols="12"
                      md="12"
                  >
                    <small class="grey--text" style="font-size: 10pt">{{ answer.created_at }}</small>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                {{ answer.content }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
          cols="12"
          md="8"
          v-else
      >
        No Replies Found
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown/src/VueMarkdown'
import {deleteThreadRequest, getSingleThreadRequest, submitNewReplyForThreadRequest} from "@/requests/Threads";
import {checkAuth, getUserDataRequest} from '@/requests/Auth';

export default {
  name: "SingleThread",
  components: {
    VueMarkdown
  },
  data: () => ({
    isAuth: false,
    userCanDelete: false,
    thread: {
      id: null,
      title: null,
      slug: null,
      content: null,
      best_answer_id: null,
      created_at: null,
      channel: {
        id: null,
        name: null
      },
      user: {
        id: null,
        name: null
      },
      answers: []
    },
    showReplyBox: false,
    replyData: {
      content: null,
      thread_id: null
    }
  }),
  methods: {
    fetchThread() {
      getSingleThreadRequest(this.$route.params.slug).then(res => {
        this.thread = res.data
      })
    },

    submitNewReply() {
      this.replyData.thread_id = this.thread.id;
      submitNewReplyForThreadRequest(this.replyData).then(res => {
        this.fetchThread();
        this.showReplyBox = false;
      })
    },

    deleteThread() {
      deleteThreadRequest(this.thread.id).then(res => {
        this.$router.push('/');
      })
    }
  },
  mounted() {
    this.fetchThread();
    checkAuth();
    this.isAuth = localStorage.getItem('isAuth') === 'true';
    getUserDataRequest().then(res => {
      this.userCanDelete = res.data[0].id === this.thread.user.id;
    })

  }
}
</script>

<style scoped>

</style>