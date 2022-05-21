<template>
  <v-list>
    <p class="mb-0">{{ total }} 条评论</p>
    <v-card class="transparent" flat ref="commentForm">
      <v-list-item class="pl-0" three-line>
        <v-list-item-avatar size="50">
          <v-img v-show="avatar" :src="avatar"></v-img>
          <v-avatar v-show="!avatar" color="grey lighten-2">
            <v-btn
              class="white--text pa-1"
              text
              @click="$router.push('/signin')"
              >登录</v-btn
            >
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content class="align-self-auto">
          <v-text-field
            v-model.trim="content"
            :placeholder="contentPlaceholder"
            clearable
            append-icon="mdi-send"
            @click:append="send"
          >
          </v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!-- 父级评论 -->
    <v-card
      v-for="(item, idx) in commentList"
      :key="item._id"
      class="transparent"
      flat
    >
      <v-list-item class="pl-0 mt-2" three-line>
        <v-list-item-avatar size="50">
          <v-img :src="item.user.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium caption mb-1">
            {{ item.user.nickname }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.content }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <span>
              {{ item.createdAt | parseTime("YYYY-MM-DD HH:mm:ss") }}
            </span>
            <v-btn icon>
              <v-icon size="16">mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon size="16">mdi-thumb-down</v-icon>
            </v-btn>
            <v-btn color="primary" plain small text @click="reply(item)">
              回复
            </v-btn>
          </v-list-item-subtitle>

          <v-list-item-subtitle v-if="item.replies.length">
            <v-btn
              v-if="item._showMore"
              color="primary"
              plain
              text
              @click="showChildComments(idx, item, item.replies)"
              >共{{ item.replies.length }}条评论，点击查看</v-btn
            >
            <template v-if="!item._showMore">
              <v-card v-for="subItem in item.replies" :key="subItem._id" flat>
                <v-list-item class="pl-0 mt-2" three-line>
                  <v-list-item-avatar size="50">
                    <v-img :src="subItem.user.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium caption mb-1">
                      {{ subItem.user.nickname }}
                      <span
                        v-if="item.user._id !== subItem.reply_user._id"
                        class="grey--text"
                        >回复
                        <a class="blue--text">{{
                          `@${subItem.reply_user.nickname}`
                        }}</a></span
                      >
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ subItem.content }}
                    </v-list-item-subtitle>
                    <v-list-item-action-text>
                      <span>
                        {{
                          subItem.createdAt | parseTime("YYYY-MM-DD HH:mm:ss")
                        }}
                      </span>
                      <v-btn icon>
                        <v-icon size="16">mdi-thumb-up</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon size="16">mdi-thumb-down</v-icon>
                      </v-btn>
                      <v-btn
                        color="primary"
                        plain
                        small
                        text
                        @click="reply(item, subItem)"
                      >
                        回复
                      </v-btn>
                    </v-list-item-action-text>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-list-item-subtitle>

          <v-list-item-content v-if="item._showReply">
            <v-list-item>
              <v-list-item-avatar size="50">
                <v-img v-if="avatar" :src="avatar"></v-img>
                <v-avatar v-else color="grey lighten-2">
                  <span class="white--text text-h5">登录</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content class="align-self-auto">
                <v-text-field
                  v-model.trim="replyContent"
                  :placeholder="replyPlaceholder"
                  clearable
                  append-icon="mdi-send"
                  @click:append="sendReply"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-content>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-list>
</template>

<script>
import { getComments, replyComment, submitComment } from "@/api/comment";
import { replyList } from "@/api/reply";
import { mapGetters } from "vuex";

export default {
  name: "CommentList",
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      contentPlaceholder: "添加评论...",
      showCommentBtns: false,
      replyContent: {},
      replyListVisible: false,
      replyListText: "查看",
      replyPlaceholder: "",
      commentList: [],
      total: 0,
      content: "",
      replyContent: "",
      showMoreComments: true,
      comment: {},
    };
  },
  computed: {
    ...mapGetters(["avatar"]),
  },
  mounted() {
    this.fetch();
  },
  methods: {
    showReplyList(idx) {
      this.commentList[idx].replyListVisible =
        !this.commentList[idx].replyListVisible;
      this.commentList[idx].replyListText = this.commentList[idx]
        .replyListVisible
        ? "隐藏"
        : "查看";
      this.$forceUpdate();
    },
    async send() {
      if (!this.content) return;
      try {
        await submitComment({
          type: this.type,
          object: this.object,
          content: this.content,
        });
        this.$message.success("评论成功");
      } catch (e) {
        this.$message.error(e);
      }
      await this.fetch();
    },
    async submit() {
      try {
        await submitComment({
          type: this.type,
          object: this.object,
          content: this.content,
        });
        this.$message.success("评论成功");
      } catch (e) {
        this.$message.error(e);
      }
      await this.fetch();
    },
    async fetch() {
      try {
        let query = {
          where: {
            is_delete: false,
            type: this.type,
            object: this.object,
          },
          limit: 10,
          skip: 0,
          sort: {
            createdAt: 1,
          },
        };
        const res = await getComments(JSON.stringify(query));
        this.commentList = res.data;
        this.commentList = this.commentList.map((item) => {
          return {
            ...item,
            _showReply: false,
            _replyText: "查看",
            _showMore: true,
          };
        });
        this.total = res.total;
      } catch (e) {
        this.$message.error(e);
      }
    },
    async reply(parent, child) {
      if (parent._showReply) {
        parent._showReply = false;
        return;
      }
      this.commentList.forEach((item) => {
        item._showReply = false;
      });
      this.replyPlaceholder = `回复 @${
        !child ? parent.user.nickname : child.user.nickname
      }：`;
      parent._showReply = true;
      this.comment = child ? { ...child, _id: parent._id } : parent;
    },
    async sendReply() {
      if (!this.replyContent) return;
      try {
        await replyComment({
          id: this.comment._id,
          type: this.type,
          object: this.object,
          reply_user: this.comment.user._id,
          content: this.replyContent,
        });
        this.$message.success("回复成功");
      } catch (e) {
        this.$message.error("回复失败");
      }
      this.replyContent = "";
      await this.fetch();
    },
    async showChildComments(idx, comment, replies) {
      comment._showMore = false;
      let params = {
        where: {
          _id: {
            $in: replies,
          },
        },
      };
      const res = await replyList(JSON.stringify(params));
      comment.replies = res.data;
      comment.replies.forEach((item) => {
        item._showReply = false;
      });
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped></style>
