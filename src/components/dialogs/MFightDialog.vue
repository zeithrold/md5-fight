<template>
  <m-dialog title="战斗页面" dialogid="fight">
    <template v-slot:toolbaractions>
          <v-btn color="secondary" @click="reset"><v-icon>mdi-refresh</v-icon></v-btn>
    </template>
    <template v-slot:pinned>
      <v-container>
        <v-row align="center">
          <v-col cols="5" class="d-flex flex-column">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <h2 class="overflow" v-on="on">{{ leftPlayer.name }}</h2>
              </template>
              <span>剩余生命值：{{ leftPlayer.health }} / {{ leftPlayer.maxHealth }}</span>
            </v-tooltip>
            <v-progress-linear
              :value="leftPlayer.health / leftPlayer.maxHealth * 100"
              color="success"
            ></v-progress-linear>
            <div class="d-flex flex-row">
              <v-chip
                v-for="buff in leftPlayer.buffs"
                :key="buff.buff.displayName"
              >{{ buff.buff.displayName }}: {{ buff.duration }}</v-chip>
            </div>
          </v-col>
          <v-col class="align-self-center text-center" cols="2">VS</v-col>
          <v-col cols="5" class="d-flex flex-column text-right">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <h2 class="overflow" v-on="on">{{ rightPlayer.name }}</h2>
              </template>
              <span>剩余生命值：{{ rightPlayer.health }} / {{ rightPlayer.maxHealth }}</span>
            </v-tooltip>
            <v-progress-linear
              :value="rightPlayer.health / rightPlayer.maxHealth * 100"
              style="ransform: rotateX(180deg);"
              color="error"
            ></v-progress-linear>
            <div class="d-flex flex-row">
              <v-chip
                v-for="buff in rightPlayer.buffs"
                :key="buff.buff.displayName"
              >{{ buff.buff.displayName }}: {{ buff.duration }}</v-chip>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-card-text style="max-height: 90%;">
      <v-row>
        <v-col cols="12" v-for="round in logs" :key="'round-' + logs.indexOf(round)">
          <v-card>
            <v-list-item
              v-for="log in round"
              :key="'log-' + round.indexOf(log)"
              :class="[log.bgColor]"
            >
              <span :class="[log.bgColor ? 'white--text' : '']" v-html="log.message"></span>
            </v-list-item>
          </v-card>
        </v-col>
        <v-card v-if="logs === []">
          <v-list-item>请点击下方的开始作战按钮。</v-list-item>
        </v-card>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!hasPlayerDeath" large block @click="newRound">新一回合</v-btn>
    </v-card-actions>
  </m-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Log } from '@/models/logs';
import * as api from '@/store/commmits';
import MDialog from './MDialog.vue';
import Player from '../../models/Player';

@Component({
  components: {
    'm-dialog': MDialog,
  },
})
export default class MFightDialog extends Vue {
  api = api;

  created() {
    this.api.setPlayerRoleOrder();
    // console.log(this.logs);
  }

  get players(): { [key: string]: Player } {
    return this.$store.state.fight.players;
  }

  get leftPlayer(): Player {
    return Object.values(this.players)[0];
  }

  get rightPlayer(): Player {
    return Object.values(this.players)[1];
  }

  get hasPlayerDeath(): boolean {
    const values = Object.values(this.players);
    let result = false;
    for (let i = 0; i < values.length; i += 1) {
      if (values[i].health === 0) result = true;
    }
    return result;
  }

  get logs(): Log[][] {
    return this.$store.state.logs.logs;
  }

  get roleOrder(): { first: string; second: string } {
    return this.$store.state.fight.order;
  }

  newRound() {
    if (this.hasPlayerDeath) {
      return;
    }
    api.beginFight(this.roleOrder.first);
    if (this.hasPlayerDeath) {
      return;
    }
    api.beginFight(this.roleOrder.second);
    api.pushLogs();
  }

  reset() {
    api.clearLogs();
    api.setPlayer(Object.keys(this.players)[0], Object.keys(this.players)[1]);
  }
}
</script>
