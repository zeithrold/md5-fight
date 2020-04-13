<template>
  <v-card>
    <v-card-title>玩家信息</v-card-title>
    <v-card-subtitle>根据玩家姓名生成的MD5以及相应的玩家属性。</v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item v-for="prop in props" :key="prop.displayName">
          <v-list-item-content>
            <span
              class="text-left"
              :class="{ 'font-weight-bold': prop.displayName === 'VS' }"
              v-html="prop.leftPlayer"
            ></span>
          </v-list-item-content>
          <v-list-item-content>
            <span
              class="text-center"
              :class="{ 'font-weight-bold': prop.displayName === 'VS' }"
              v-html="prop.displayName"
            ></span>
          </v-list-item-content>
          <v-list-item-content>
            <span
              class="text-right"
              :class="{ 'font-weight-bold': prop.displayName === 'VS' }"
              v-html="prop.rightPlayer"
            ></span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn block large color="primary" disabled>生成玩家属性</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import store from '@/store';

@Component({})
export default class MPlayerSetCard extends Vue {
  get props(): {
    [sectionKey: string]: {
      leftPlayer: number | string;
      rightPlayer: number | string;
      displayName: string;
    };
    } {
    return this.$store.getters.playerDisplayProps;
  }
}
</script>
