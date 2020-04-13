<template>
<v-footer padless>
    <v-card flat tile width="100%" color="primary" class="text-center">
      <v-card-text class="white--text">
        MD5-Fight重置了Rinick制作的Flash小游戏
        <a class="white--text" href="https://baike.baidu.com/item/MD5%E5%A4%A7%E4%BD%9C%E6%88%98">
          MD5大作战</a
        >
        ，由Vue.js编写。
        <br />MD5-Fight的制作离不开开源软件的强力支持。<br /><a
          @click="api.openDialog('donate')"
          style="text-decoration: underline;"
          class="white--text"
          >姥爷们求捐助QAQ</a
        >
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }}
        Made with
        <v-icon color="white" small>mdi-heart</v-icon>
        by <b>Zeithrold</b>.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as api from '@/store/commmits';
// import { getModule } from 'vuex-module-decorators';
// import Site from '@/store/site';

@Component({})
export default class MFooter extends Vue {
  api = api;
}
</script>
