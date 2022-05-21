<template>
  <div id="video" class="pa-4 pl-0">
    <!-- <v-container fluid> -->
    <h2>视频</h2>

    <!-- <v-row> -->
    <v-tabs v-model="tab" id="tab" class="mt-5">
      <v-tab> 视频 </v-tab>
      <v-tab> 直播 </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <template>
          <v-card flat>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Filter"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              no-data-text="没有视频, 请先上传视频."
              :headers="headers"
              :items="videos"
              :search="search"
              :loading="loading"
              loading-text="加载中... 请稍等"
            >
              <template v-slot:top>
                <v-dialog v-model="dialogDelete" persistent max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline"> 永久删除此视频?</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-card class="card" tile flat>
                          <v-row no-gutters>
                            <v-col cols="3" sm="2" md="5" lg="5">
                              <v-img
                                class="align-center"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                              >
                              </v-img>
                            </v-col>
                            <v-col>
                              <div class="ml-2">
                                <v-card-title
                                  class="pl-2 subtitle-1 font-weight-bold"
                                  style="line-height: 1"
                                >
                                  {{ itemToDelete.name }}
                                </v-card-title>

                                <v-card-subtitle
                                  class="pl-2 pt-2 pb-0"
                                  style="line-height: 1"
                                >
                                  发布时间 4月20日, 2020 <br />
                                  {{ itemToDelete.views }} 次
                                </v-card-subtitle>
                              </div>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogDelete = !dialogDelete"
                        >取消</v-btn
                      >

                      <v-btn color="blue darken-1" text @click="deleteItem"
                        >永久删除</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon href text class="mr-2">
                  <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
                </v-btn>
                <v-btn icon href text class="mr-2" router to="/watch/123">
                  <v-icon> mdi-youtube </v-icon>
                </v-btn>
                <v-btn icon text @click.stop="deleteBtn(item)">
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-tab-item>
      <v-tab-item> live </v-tab-item>
    </v-tabs-items>
    <!-- </v-row> -->
    <!-- </v-container> -->
  </div>
</template>

<script>
import { getPersonalMovie } from "@/api/movie";

export default {
  data: () => ({
    loading: true,
    dialogDelete: false,
    tab: null,
    search: "",
    headers: [
      {
        text: "Video",
        align: "start",
        value: "name",
      },
      { text: "Visibility", value: "visibility" },
      { text: "Restrictions", value: "restrictions" },
      { text: "Views", value: "views" },
      { text: "Comments", value: "comments" },
      { text: "Likes (vs. dislikes)", value: "likes (vs. dislikes)" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    videos: [],
    itemToDelete: {},
    pageParams: {
      current: 1,
      size: 10,
      total: 0,
    },
  }),
  methods: {
    editItem(item) {
      this.$router.push({ name: `Detail`, params: { id: item.id } });
    },
    deleteBtn(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    deleteItem() {
      this.dialogDelete = false;
      this.videos = this.videos.filter(
        (video) => this.itemToDelete.id !== video.id
      );
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let params = {
        skip: (this.pageParams.current - 1) * this.pageParams.size,
        limit: this.pageParams.size,
      };
      const res = await getPersonalMovie(JSON.stringify(params));
      this.loading = false;
      this.videos = res.data;
      this.pageParams.total = res.total;
    },
  },
};
</script>

<style lang="scss">
// .card,
// #tab .v-tabs-bar {
//   background: #f9f9f9 !important;
// }
</style>
