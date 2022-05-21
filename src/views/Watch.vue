<template>
  <div id="watch">
    <v-container fluid>
      <v-row>
        <v-col class="mx-auto" cols="11">
          <v-row>
            <v-col cols="12" lg="8" md="8" sm="12">
              <v-skeleton-loader
                :loading="videoLoading"
                large
                tile
                type="card-avatar, article, actions"
              >
                <v-responsive>
                  <player
                    id="mse"
                    :url="video.url"
                    :cover="video.cover"
                  ></player>
                </v-responsive>
                <v-card class="card" flat tile>
                  <v-card-title class="pl-0 pb-0">
                    {{ video.title }}
                  </v-card-title>
                  <div id="btns" class="d-flex flex-wrap justify-space-between">
                    <v-card-subtitle
                      class="pl-0 pt-0 pb-0 subtitle-1"
                      style="line-height: 2.4em"
                    >
                      {{ video.views }} 次观看
                      <v-icon>mdi-circle-small</v-icon>
                      {{ video.createdAt | parseTime("YYYY-MM-DD HH:mm:ss") }}
                    </v-card-subtitle>
                    <v-card-actions class="pt-0 pl-0 grey--text">
                      <v-btn text>
                        <v-icon class="pr-2">mdi-thumb-up</v-icon>
                        {{ this.video.like }}
                      </v-btn>
                      <v-btn text>
                        <v-icon class="pr-2">mdi-thumb-down</v-icon>
                        {{ this.video.unlike }}
                      </v-btn>
                      <v-btn text>
                        <v-icon>mdi-share</v-icon>
                        分享
                      </v-btn>
                      <v-btn text>
                        <v-icon>mdi-playlist-plus</v-icon>
                        收藏
                      </v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
                <!--视频-->
                <v-row class="justify-space-between">
                  <v-col cols="6" lg="5" md="5" sm="6">
                    <v-card class="transparent" flat>
                      <v-list-item three-line>
                        <v-list-item-avatar size="50">
                          <v-img :src="video.user.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="align-self-auto">
                          <v-list-item-title class="font-weight-medium mb-1">
                            {{ video.user.nickname }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ video.subscribers || 0 }} 位订阅者
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-col>
                  <v-col cols="6" lg="4" md="4" sm="6">
                    <div class="d-flex justify-end align-center">
                      <v-btn class="red white--text mt-6" depressed large tile>
                        已订阅
                      </v-btn>
                      <v-btn class="ml-5 mt-6" icon>
                        <v-icon>mdi-bell</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="11" md="11" offset="1">
                    <p>
                      {{
                        truncate
                          ? truncateText(video.introduction, 150)
                          : video.introduction
                      }}
                    </p>
                    <v-btn
                      class="remove-hover-bg"
                      small
                      text
                      plain
                      @click="show"
                    >
                      展开
                    </v-btn>
                  </v-col>
                  <!--评论区-->
                  <v-col>
                    <comment-list :object="movieId" type="Movie"></comment-list>
                  </v-col>
                </v-row>
              </v-skeleton-loader>
            </v-col>

            <!-- 相关内容推荐 -->
            <v-col cols="12" lg="4" md="4" sm="12">
              <hr class="grey--text" />
              <h4 class="mb-3 mt-3">Up next</h4>
              <div v-for="i in 10" :key="i" class="mb-5">
                <v-skeleton-loader
                  :loading="loading"
                  class="mx-auto"
                  large
                  tile
                  type="list-item-avatar-three-line"
                >
                  <v-card class="card" flat tile>
                    <v-row no-gutters>
                      <v-col class="mx-auto" cols="3" lg="5" md="5" sm="3">
                        <!-- <v-responsive max-height="100%"> -->
                        <v-img
                          class="align-center"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                        </v-img>
                        <!-- </v-responsive> -->
                      </v-col>
                      <v-col>
                        <div class="ml-2">
                          <v-card-title
                            class="pl-2 pt-0 subtitle-1 font-weight-bold"
                            style="line-height: 1"
                          >
                            Top western road trips
                          </v-card-title>

                          <v-card-subtitle
                            class="pl-2 pt-2 pb-0"
                            style="line-height: 1"
                          >
                            Tech Reagan<br />
                            9.6k views
                            <v-icon>mdi-circle-small</v-icon>
                            6 hours ago
                          </v-card-subtitle>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-skeleton-loader>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getMovieById } from "@/api/movie";
import { getCommentList, getComments, submitComment } from "@/api/comment";
import CommentList from "@/components/CommentList";
import Player from "@/components/Player";

export default {
  components: { CommentList, Player },
  data: () => ({
    loading: true,
    videoLoading: true,
    video: {
      channelName: "Tech Reagan",
      subscribers: "100k",
      createdAt: "6 hours ago",
      views: "200,459",
      videoUrl: "/video.mp4",
      title: "Attendance Management System",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa vel inventore voluptatum reiciendis delectus quibusdam incidunt consequuntur, nostrum aperiam, natus quidem qui corrupti reprehenderit quaerat neque voluptatibus? Ullam, maiores temporibus!",
    },
    truncate: true,
    comment: "",
    showCommentBtns: false,
    repliesInput: {},
    commentList: [],
    total: 0,
  }),

  computed: {
    movieId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    await this.getMovie();
    await this.getComments();
    this.loading = false;
  },
  methods: {
    showReply(id) {
      this.$refs[id][0].classList.toggle("d-none");
    },
    hideReply(id) {
      this.$refs[`form${id}`][0].reset();
      this.$refs["reply" + id][0].classList.toggle("d-none");
    },
    show(event) {
      if (event.target.innerText === "展开") {
        this.truncate = false;
        event.target.innerText = "收起";
      } else {
        this.truncate = true;
        event.target.innerText = "展开";
      }
    },
    truncateText(string = "", num) {
      if (string.length <= num) {
        return string;
      }
      return string.slice(0, num);
    },
    async getMovie() {
      const res = await getMovieById(this.movieId);
      this.video = res.data;
      this.videoLoading = false;
    },

    async getComments() {
      let query = {
        where: {
          object: this.movieId,
        },
        limit: 10,
        skip: 0,
      };
      try {
        const res = await getComments(JSON.stringify(query));
        this.total = res.total;
        this.commentList = res.data;
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
video {
  max-width: 100%;
  /* min-height: 360px; */
  /* width: 640px;
  height: 360px; */
}

#btns {
  border-bottom: 1px solid #e0d8d8;

  button {
    color: #7f7f7f;
  }
}

button.v-btn.remove-hover-bg {
  background-color: initial !important;

  &:hover {
    background-color: #f9f9f9;
  }
}
</style>
