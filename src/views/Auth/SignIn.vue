<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col class="ma-auto" cols="12" lg="4" md="5" sm="6" xs="12">
        <v-card class="px-8 pt-6 pb-12" outlined>
          <v-card-title class="text-center">iShare</v-card-title>
          <v-card-subtitle class="mb-5">登录</v-card-subtitle>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
              <form @submit.prevent="handleSubmit(signin)"
                    @reset.prevent="reset">
                <ValidationProvider v-slot="{ errors }"
                                    name="Email"
                                    rules="required|email">
                  <v-text-field v-model="email"
                                :error-messages="errors"
                                label="邮箱"
                                outlined>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }"
                                    name="Password"
                                    rules="required">
                  <p class="ma-0 text-right">
                    <v-btn class="pl-0 text-capitalize"
                           color="primary"
                           href="true"
                           small
                           text>
                      忘记密码?
                    </v-btn>
                  </p>
                  <v-text-field v-model="password"
                                :error-messages="errors"
                                label="密码"
                                outlined
                                type="password">
                  </v-text-field>
                </ValidationProvider>
                <div class="mt-6 d-flex justify-space-between">
                  <v-btn class="pl-0 text-capitalize"
                         color="primary"
                         router
                         small
                         text
                         to="signup">
                    注册
                  </v-btn>
                  <v-btn class="primary" depressed type="submit">登录</v-btn>
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    email: 'ali@qq.com',
    password: '123456',
  }),
  methods: {
    async signin() {
      await this.$store.dispatch('user/login', {email: this.email, password: this.password})
      await this.$store.dispatch('user/getInfo')
      this.$router.push('/')
    },
  },
  mounted() {
    if (this.$route.params) {
      this.email = this.$route.params.email
      this.password = this.$route.params.password
    }
  },
};
</script>

<style></style>
