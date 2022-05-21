<template>
  <nav id="navbar">
    <v-app-bar app class="white" clipped-left flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">
        <router-link class="black--text" style="text-decoration: none" to="/"
          >iShare</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="mdi-magnify"
        class="hidden-sm-and-down"
        dense
        flat
        hide-details
        outlined
        placeholder="搜索"
        v-model.trim="search_query"
        @click:append="search"
      >
      </v-text-field>

      <v-spacer></v-spacer>
      <v-menu offsetY>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-on="{ ...tooltip, ...menu }">
                <v-icon size="25">mdi-video-plus</v-icon>
              </v-btn>
            </template>
            <span>投稿</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item router to="/studio">
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-play-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>上传视频</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-access-point</v-icon>
            </v-list-item-icon>
            <v-list-item-title>直播</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon size="25">mdi-apps</v-icon>
          </v-btn>
        </template>
        <span>分类</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-7" icon v-on="on">
            <v-icon size="25">mdi-bell</v-icon>
          </v-btn>
        </template>
        <span>消息</span>
      </v-tooltip>

      <v-menu left offset-y>
        <template v-slot:activator="{ on }">
          <v-avatar depressed fab small v-on="on">
            <img
              v-if="$store.getters.avatar"
              :src="$store.getters.avatar"
              alt="未登录"
            />
            <v-avatar v-else color="grey lighten-2" @click="toLogin">
              <span class="white--text">登录</span>
            </v-avatar>
          </v-avatar>
        </template>

        <v-card v-if="$store.getters.token">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="avatar" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item router to="/channels/10">
              <v-list-item-icon>
                <v-icon>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item>
            <v-list-item router to="/studio">
              <v-list-item-icon>
                <v-icon>mdi-youtube-studio</v-icon>
              </v-list-item-icon>
              <v-list-item-title>工作空间</v-list-item-title>
            </v-list-item>
            <v-list-item router to="/signin">
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>退出</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      id="nav"
      v-model="drawer"
      :clipped="$route.name !== 'Watch'"
      :temporary="$route.name === 'Watch'"
      app
    >
      <div v-bar class="v-navigation-drawer__content" tag="div">
        <v-list class="py-0" dense nav tag="div">
          <v-list-item
            :class="{
              'hidden-lg-and-up': $route.name === 'Watch' ? false : true,
            }"
          >
            <v-app-bar-nav-icon
              class="mr-5"
              @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">iShare</v-toolbar-title>
          </v-list-item>
          <v-divider class="hidden-lg-and-up"></v-divider>
          <div v-for="parentItem in items" :key="parentItem.header">
            <v-subheader
              v-if="parentItem.header"
              class="pl-3 py-4 subtitle-1 font-weight-bold text-uppercase"
              >{{ parentItem.header }}
            </v-subheader>
            <v-list-item
              v-for="(item, i) in parentItem.pages"
              :key="item.title"
              :to="item.link"
              active-class="active-item"
              class="mb-0"
              exact
              link
              router
            >
              <v-list-item-icon v-if="parentItem.header !== 'Subscriptions'">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-avatar v-else class="mr-5">
                <img
                  :src="`https://randomuser.me/api/portraits/men/${i}.jpg`"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium subtitle-2"
                  >{{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2 mb-2"></v-divider>
          </div>

          <span v-for="link in links" :key="link.text">
            <span v-if="link.text === 'Terms'" class="mb-2 d-block"> </span>
            <v-btn
              :to="link.link"
              class="text-capitalize px-1"
              href
              router
              small
              text
              >{{ link.text }}</v-btn
            >
          </span>
        </v-list>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: false,
    items: [
      {
        header: null,
        pages: [
          { title: "首页", link: "/", icon: "mdi-home" },
          { title: "流行", link: "/trending", icon: "mdi-fire" },
          {
            title: "订阅内容",
            link: "#s",
            icon: "mdi-youtube-subscription",
          },
        ],
      },
      {
        header: null,
        pages: [
          {
            title: "媒体库",
            link: "#l",
            icon: "mdi-play-box-multiple",
          },
          {
            title: "历史记录",
            link: "#h",
            icon: "mdi-history",
          },
          {
            title: "我的视频",
            link: "#yv",
            icon: "mdi-play-box-outline",
          },

          {
            title: "稍后再看",
            link: "#wl",
            icon: "mdi-clock",
          },

          {
            title: "顶过的视频",
            link: "#lw",
            icon: "mdi-thumb-up",
          },
        ],
      },
      {
        header: "订阅内容",
        pages: [
          {
            title: "asmr yeonchu 연츄 ",
            link: "#tm",
            icon: "mdi-badge-account",
          },
          {
            title: "[ASMR]nara_나라",
            link: "#tn",
            icon: "mdi-badge-account",
          },
          {
            title: "SOMBIE丧妹",
            link: "#nn",
            icon: "mdi-badge-account",
          },
          {
            title: "ASMR PPOMO",
            link: "#ch",
            icon: "mdi-badge-account",
          },
        ],
      },
      // {
      //   header: "MORE FROM VUETUBE",
      //   pages: [
      //     {
      //       title: "VueTube Premium",
      //       link: "#vp",
      //       icon: "mdi-youtube",
      //     },
      //     {
      //       title: "Gaming",
      //       link: "#g",
      //       icon: "mdi-youtube-gaming",
      //     },
      //     {
      //       title: "Live",
      //       link: "#li",
      //       icon: "mdi-access-point",
      //     },
      //   ],
      // },
      // {
      //   header: null,
      //   pages: [
      //     {
      //       title: "Setting",
      //       link: "#sg",
      //       icon: "mdi-cog",
      //     },
      //     {
      //       title: "Report history",
      //       link: "#rh",
      //       icon: "mdi-flag",
      //     },
      //     {
      //       title: "Help",
      //       link: "#hp",
      //       icon: "mdi-help-circle",
      //     },
      //     {
      //       title: "Send feedback",
      //       link: "#f",
      //       icon: "mdi-message-alert",
      //     },
      //   ],
      // },
    ],
    links: [
      { text: "友链", link: "#" },
      // { text: "Press", link: "#" },
      // { text: "Copyrignt", link: "#" },
      // { text: "Contact us", link: "#" },
      // { text: "Creators", link: "#" },
      // { text: "Advertise", link: "#" },
      // { text: "Developers", link: "#" },
      // { text: "Terms", link: "#" },
      // { text: "Privacy", link: "#" },
      // { text: "Policy & Safety", link: "#" },
      // { text: "Test new features", link: "#" },
    ],
    search_query: "",
  }),
  methods: {
    search() {
      this.$router.push({
        path: "/results",
        query: {
          search_query: this.search_query,
        },
      });
      console.log("hello");
    },
    toLogin() {
      this.$router.replace("/signin");
    },
  },
  computed: {
    ...mapGetters(["avatar", "name", "email"]),
  },
  watch: {
    avatar: {
      handler() {
        this.$store.dispatch("user/getInfo");
      },
      immediate: true,
    },
  },
  mounted() {
    this.drawer = this.$vuetify.breakpoint.mdAndDown ? false : true;
    this.drawer = this.$route.name === "Watch" ? false : this.drawer;
  },
};
</script>

<style lang="scss">
#navbar {
  z-index: 9999;
  .active-item {
    .v-list-item__icon {
      color: red !important;
    }
  }

  .v-navigation-drawer__border {
    width: 0 !important;
  }

  .vuebar-element {
    height: 250px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 10px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0, 0, 0, 0);
    transform: rotate3d(0, 0, 0, 0);
    -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;
    transition: background-color 100ms ease-out, margin 100ms ease-out,
      height 100ms ease-out;

    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .v-navigation-drawer__content:hover .vb > .vb-dragger > .vb-dragger-styler {
    width: 10px;
    background-color: #e0e0e0;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.3);
    background-color: rgba(255, 255, 255, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    margin: 0px;
    width: 10px;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244, 0.5);
  }
}
</style>
