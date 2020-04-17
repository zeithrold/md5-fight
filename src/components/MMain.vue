<template>
  <v-app>
    <m-nav-bar></m-nav-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <m-player-set-card></m-player-set-card>
          </v-col>
          <v-col cols="12" sm="12">
            <m-player-info-card></m-player-info-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <m-footer></m-footer>
    <m-donate-dialog></m-donate-dialog>
    <m-fight-dialog></m-fight-dialog>
    <m-skillbuff-introduce-dialog></m-skillbuff-introduce-dialog>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MNavBar from './MNavBar.vue';
import MFooter from './MFooter.vue';
import MDonateDialog from './dialogs/MDonateDialog.vue';
import MFightDialog from './dialogs/MFightDialog.vue';
import MPlayerSetCard from './cards/MPlayerSetCard.vue';
import MPlayerInfoCard from './cards/MPlayerInfoCard.vue';
import MSkillBuffIntroduceDialog from './dialogs/MSkillBuffIntroduceDialog.vue';

@Component({
  components: {
    'm-nav-bar': MNavBar,
    'm-footer': MFooter,
    'm-donate-dialog': MDonateDialog,
    'm-fight-dialog': MFightDialog,
    'm-player-set-card': MPlayerSetCard,
    'm-player-info-card': MPlayerInfoCard,
    'm-skillbuff-introduce-dialog': MSkillBuffIntroduceDialog,
  },
})
export default class MMain extends Vue {}
</script>
