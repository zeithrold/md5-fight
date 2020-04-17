<template>
  <v-dialog
    v-model="visiable"
    scrollable
    max-width="80%"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closePanel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $props.title }}</v-toolbar-title>
        <v-subheader>{{ $props.subtitle }}</v-subheader>
        <v-spacer></v-spacer>
        <v-toolbar-items><slot name="toolbaractions"></slot></v-toolbar-items>
      </v-toolbar>
      <slot name="pinned"></slot>
      <v-card-text><slot></slot></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import Site from '@/store/site';
import * as api from '@/store/commmits';
import store from '@/store';

@Component({
  props: {
    title: String,
    subtitle: {
      type: String,
      default: '',
    },
    dialogid: String,
  },
})
export default class MDialog extends Vue {
  api = api;

  store = store;

  created() {
    this.api.registerDialog(this.$props.dialogid);
  }

  get visiable() {
    return this.store.state.site.dialogs[this.$props.dialogid];
  }

  // visiable = true;

  closePanel() {
    this.api.closeDialog(this.$props.dialogid);
  }
}
</script>
