<template>
  <v-app-bar
      app
      color="primary"
      dark>
    <v-toolbar-title>MD5-Fight 2.0</v-toolbar-title>
    <v-subheader>玩家姓名MD5自动对战</v-subheader>
    <v-spacer></v-spacer>
    <v-btn color="primary" depressed @click="openDialog('skillbuffintroduce')">技能效果介绍</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { openDialog } from '@/store/commmits';

@Component
export default class MNavBar extends Vue {
  openDialog = openDialog;
}
</script>
