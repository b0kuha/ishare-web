<template>
  <v-card
    :max-width="card.maxWidth"
    :to="video.url"
    class="content-bg card mx-auto"
    flat
    router
    tile
  >
    <v-img :src="video.cover" height="200px"></v-img>
    <v-row no-gutters>
      <v-col v-if="card.type != 'noAvatar'" cols="2">
        <v-list-item :to="channel.url" class="pl-0 pt-3" router>
          <v-list-item-avatar color="grey darken-3">
            <v-img :src="video.user.avatar" class="elevation-6"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col>
        <v-card-title class="pl-2 pt-3 subtitle-1 font-weight-bold">
          {{ video.title }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          {{ channel.name }}
        </v-card-subtitle>
        <v-card-subtitle class="pl-2 pt-0">
          {{ video.views }} 次<v-icon>mdi-circle-small</v-icon
          >{{
            video.createdAt | parseTime("YYYY-MM-DD HH:mm:ss")
          }}
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    channel: {
      type: Object,
      required: true,
    },
    card: Object,
  },
};
</script>

<style></style>
