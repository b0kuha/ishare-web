<template>
  <div ref="warp">
    <div :id="id" ref="player" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import Player from "xgplayer";
import _ from "lodash";

export default {
  name: "Player",
  props: {
    id: {
      type: String,
      default: "xgPlayer",
    },
    url: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      player: null,
      isMini: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
    this.player = new Player({
      id: this.id,
      url: this.url,
      poster: this.cover, // 封面图
      volume: 0.3,
      playsinline: true,
      fluid: true,
      videoInit: true,
      fitVideoSize: "fixWidth",
      pip: true,
    });
  },
  beforeMount() {
    window.removeEventListener("scroll", this.scrollHandle);
  },
  methods: {
    scrollHandle() {
      const offset = this.$el.getBoundingClientRect();
      const offsetTop = offset.top;
      const offsetBottom = offset.bottom;
      // const offsetHeight = offset.height;
      // 进入可视区域
      // console.log(offsetTop,offsetBottom)
      if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
        console.log("进入可视区域");
        if (this.isMini) {
          this.player.exitMiniplayer();
          this.isMini = false;
        }
      } else {
        console.log("移出可视区域");
        if (!this.isMini) {
          this.player.getMiniplayer();
          this.isMini = true;
        }
      }
    },
  },
};
</script>

<style></style>
