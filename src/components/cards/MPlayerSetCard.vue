<template>
  <v-card>
    <v-card-title>
      设置玩家姓名
    </v-card-title>
    <v-card-subtitle>
      系统将根据玩家姓名生成MD5以及相应的玩家属性。
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="玩家1的名字" outlined v-model="leftPlayer"> </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="玩家2的名字" outlined v-model="rightPlayer"> </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block large color="primary" @click="api.setPlayer(leftPlayer, rightPlayer)">
        生成玩家属性</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as api from '@/store/commmits';
// import Fight from '@/store/fight';
// import { getModule } from 'vuex-module-decorators';

@Component({})
export default class MPlayerSetCard extends Vue {
  // fight = getModule(Fight)
  api = api;

  leftPlayer = '玩家 1';

  rightPlayer = '玩家 2';
}
</script>
