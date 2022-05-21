<template>
  <div id="home" class="pa-4">
    <v-container fluid>
      <h3 class="headline font-weight-medium">推荐</h3>
      <v-row>
        <v-col
          v-for="item in movieList"
          :key="item._id"
          class="mx-xs-auto"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-skeleton-loader :loading="loading" type="card-avatar">
            <v-hover>
              <video-card
                :card="{ maxWidth: 350 }"
                :channel="channel"
                :video="item"
              >
              </video-card>
            </v-hover>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import videoCard from "@/components/VideoCard";
import { getMovieList } from "@/api/movie";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    movieList: [],
    channel: {
      url: "/channels/12",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    pageParams: {
      total: 0,
      current: 1,
      size: 16,
    },
  }),
  components: {
    videoCard,
  },
  mounted() {
    this.fetchMovieList();
  },
  methods: {
    async fetchMovieList() {
      let params = {
        where: {
          status: true,
        },
        limit: this.pageParams.size,
        skip: (this.pageParams.current - 1) * this.pageParams.size,
      };
      this.loading = true;
      try {
        const res = await getMovieList(JSON.stringify(params));
        this.movieList = res.data;
        this.movieList = this.movieList.map((item) => {
          item.url = `/watch/${item._id}`;
          return item;
        });
        this.pageParams.total = res.total;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    getMovieListResHandle(res) {
      this.movieList = res.data;
      this.movieList = this.movieList.map((item) => {
        item.url = `/watch/${item._id}`;
        return item;
      });
    },
  },
};
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
