<template>
  <div class="results__wrap text-center">
    <v-list v-show="datalist.length" style="width: 100%" class="text-left">
      <v-list-item
        v-for="item in datalist"
        :key="item._id"
        :to="`/watch/${item._id}`"
        three-line
      >
        <v-list-item-icon>
          <v-card>
            <v-img :src="item.cover" style="width: 360px"></v-img>
          </v-card>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.views }}次观看
            {{ item.createdAt | parseTime("YYYY-MM-DD HH:mm:ss") }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <div class="d-flex">
              <v-list-item-avatar>
                <v-img :src="item.user.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>
                {{ item.user.nickname }}
              </v-list-item-title>
            </div>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ item.introduction }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="pa-4">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.current"
        :page-sizes="[2, 5, 10, 20, 50, 100]"
        :page-size="pageParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.total"
      >
      </el-pagination>
    </div>
    <h2 v-show="!datalist.length" class="blue--text">暂无搜索结果</h2>
  </div>
</template>

<script>
import { getMovieList } from "@/api/movie";
export default {
  name: "Results",
  data() {
    return {
      datalist: [],
      pageParams: {
        total: 0,
        current: 1,
        size: 10,
      },
    };
  },
  computed: {
    search_query() {
      return this.$route.query.search_query;
    },
  },
  watch: {
    search_query: {
      async handler(n, v) {
        await this.fetch();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async fetch() {
      this.datalist = [];
      let params = {
        where: {
          $and: [
            { status: true },
            {
              $or: [
                {
                  title: { $regex: this.search_query },
                },
                {
                  "user.nickname": { $regex: this.search_query },
                },
              ],
            },
          ],
        },
        limit: this.pageParams.size,
        skip: (this.pageParams.current - 1) * this.pageParams.size,
      };
      const res = await getMovieList(JSON.stringify(params));
      this.datalist = res.data;
      this.pageParams.total = res.total;
    },
    handleSizeChange(size) {
      this.pageParams.size = size;
      this.pageParams.current = 1;
      this.fetch();
    },
    handleCurrentChange(current) {
      this.pageParams.current = current;
      this.fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
.results__wrap {
  // display: flex;
  // justify-content: center;
  // max-width: 450px;
  padding: 0 200px;
}
</style>
