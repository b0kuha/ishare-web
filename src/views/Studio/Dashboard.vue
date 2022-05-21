<template>
  <div id="dashboard" class="pa-4">
    <v-container fluid>
      <div class="d-flex justify-space-between mb-5">
        <h2>频道内容</h2>
        <div class="right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                @click="dialog = true"
                class="mr-4 white"
                icon
                v-on="{ ...tooltip }"
                ><v-icon size="25" class="small">mdi-upload</v-icon></v-btn
              >
            </template>
            <span>上传视频</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn class="white" icon v-on="{ ...tooltip }"
                ><v-icon size="25" class="small"
                  >mdi-access-point</v-icon
                ></v-btn
              >
            </template>
            <span>直播</span>
          </v-tooltip>
        </div>
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" outlined>
            <v-card-title>最近视频</v-card-title>
            <v-responsive class="mx-5">
              <v-img
                class="white--text align-en"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
            </v-responsive>

            <v-card-subtitle class="pl-6 pb-0 text--primary"
              >First 8 days 20 hours:</v-card-subtitle
            >
            <v-card-text>
              <v-list flat class="pl-0 pt-0">
                <v-list-item class="pl-2 mt-1" style="min-height: 30px">
                  <v-list-item-title class="caption grey--text"
                    >播放量</v-list-item-title
                  >
                  <span class="caption grey--text">5</span>
                </v-list-item>
                <v-list-item class="pl-2 mt-1" style="min-height: 30px">
                  <v-list-item-title class="caption grey--text"
                    >播放次数</v-list-item-title
                  >
                  <span class="caption grey--text">5</span>
                </v-list-item>

                <v-list-item class="pl-2" style="min-height: 30px">
                  <v-list-item-title class="caption grey--text"
                    >观看时长 (时)</v-list-item-title
                  >
                  <span class="caption grey--text">0.0</span>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-actions class="d-block ml-2">
              <v-btn color="blue" text> 视频分析页 </v-btn>
              <br />
              <v-btn color="blue" text> 查看评论 (4) </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" outlined>
            <v-card-title>标题测试2</v-card-title>
            <v-responsive class="mx-5">
              <v-img
                class="white--text align-en"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
            </v-responsive>

            <v-card-text class="text--primary">
              <v-card-title class="subtitle-2">测试标题</v-card-title>
              <v-card-subtitle class="caption"
                >测试简介Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Rerum deleniti in numquam molestias laboriosam aperiam ea,
                provident expedita mollitia
              </v-card-subtitle>
            </v-card-text>

            <v-card-actions class="d-block ml-2">
              <v-btn color="blue" text> 去看看 </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" outlined>
            <v-card-title class="pl-5">频道分析</v-card-title>

            <v-card-subtitle class="caption pl-5 pb-0"
              >当前订阅者</v-card-subtitle
            >
            <h1 class="pl-5">1</h1>
            <p class="pl-5 caption grey--text">
              <span class="green--text">+1</span> 过去一月内
            </p>
            <v-divider></v-divider>
            <h5 class="pl-6 mt-4 mb-0">总计</h5>
            <v-card-subtitle class="pl-6 pb-0 pt-0 caption"
              >过去一月内</v-card-subtitle
            >
            <v-card-text>
              <v-list flat class="pl-0 pt-0">
                <v-list-item class="pl-2 mt-1" style="min-height: 30px">
                  <v-list-item-title class="caption grey--text"
                    >播放次数</v-list-item-title
                  >
                  <span class="caption grey--text">5</span>
                </v-list-item>

                <v-list-item class="pl-2" style="min-height: 30px">
                  <v-list-item-title class="caption grey--text"
                    >观看时长 (时)</v-list-item-title
                  >
                  <span class="caption grey--text">0.0</span>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <h5 class="pl-5 mt-4 pb-0">所有视频</h5>
            <v-card-subtitle class="pl-6 pt-0 pb-0 caption"
              >48小时内播放次数</v-card-subtitle
            >

            <v-card-actions class="d-block ml-2">
              <v-btn color="blue" text> 频道分析页 </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="mx-auto" outlined>
            <v-card-title class="pl-5">最近订阅</v-card-title>

            <v-card-actions class="d-block ml-2">
              <v-btn color="blue" text @click="subscribersDialog = true">
                查看所有
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <upload-video-modal
      :open-dialog="dialog"
      v-on:closeDialog="dialog = false"
    /> -->
    <upload-movie-modal :show.sync="dialog"></upload-movie-modal>
    <subscribers-modal
      :open-dialog="subscribersDialog"
      @closeDialog="subscribersDialog = false"
    />
  </div>
</template>

<script>
import UploadVideoModal from "@/components/UploadVideoModal";
import SubscribersModal from "@/components/SubscribersModal";
import UploadMovieModal from "../../components/UploadMovieModal.vue";
export default {
  data: () => ({
    loading: true,
    dialog: false,
    subscribersDialog: false,
  }),
  components: {
    UploadVideoModal,
    SubscribersModal,
    UploadMovieModal,
  },
  mounted() {},
};
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
