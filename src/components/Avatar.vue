<template>
  <div>
    <v-avatar
      v-if="avatar"
      v-bind="$attrs"
      @click="$router.push('/channels/222')"
    >
      <v-img :src="avatar"> </v-img>
    </v-avatar>
    <v-avatar
      v-else
      v-bind="$attrs"
      color="grey lighten-2 white--text"
      @click="$router.push('/signin')"
      >登录</v-avatar
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "avatar",
  computed: {
    ...mapGetters(["avatar"]),
  },
};
</script>

<style></style>
