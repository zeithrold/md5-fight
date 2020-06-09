<template>
  <m-dialog title="技能&效果介绍" dialogid="skillbuffintroduce">
    <v-container><h1>技能</h1>
    <v-row>
      <v-col v-for="skill in skills" :key="skill.displayName" cols="12" md="4">
        <v-card>
          <v-card-title>{{ skill.displayName }}</v-card-title>
          <v-card-subtitle> <i>“{{skill.quote}}”</i> </v-card-subtitle>
          <v-card-text>{{ skill.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <h1>效果</h1>
    <v-row>
    <v-col v-for="buff in buffs" :key="buff.displayName" cols="12" md="4">
        <v-card>
          <v-card-title>{{ buff.displayName }}</v-card-title>
          <v-card-subtitle> <i>“{{buff.quote}}”</i> </v-card-subtitle>
          <v-card-text>{{ buff.description }}</v-card-text>
        </v-card>
      </v-col></v-row></v-container>
  </m-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { buffList } from '@/models/buffs';
import { skillList } from '@/models/skills';
import MDialog from './MDialog.vue';

@Component({
  components: {
    'm-dialog': MDialog,
  },
})
export default class MSkillBuffIntroduceDialog extends Vue {
  skills = skillList;

  buffs = buffList;
}
</script>
