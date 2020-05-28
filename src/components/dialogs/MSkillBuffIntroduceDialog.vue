<template>
  <m-dialog title="技能&效果介绍" dialogid="skillbuffintroduce">
    <v-container><h1>技能</h1>
    <v-row>
      <v-col v-for="skill in skills" :key="skill.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ skill.name }}</v-card-title>
          <v-card-subtitle> <i>“{{skill.quote}}”</i> </v-card-subtitle>
          <v-card-text>{{ skill.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <h1>效果</h1>
    <v-row>
    <v-col v-for="buff in buffs" :key="buff.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ buff.name }}</v-card-title>
          <v-card-subtitle> <i>“{{buff.quote}}”</i> </v-card-subtitle>
          <v-card-text>{{ buff.description }}</v-card-text>
        </v-card>
      </v-col></v-row></v-container>
  </m-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MDialog from './MDialog.vue';

@Component({
  components: {
    'm-dialog': MDialog,
  },
})
export default class MSkillBuffIntroduceDialog extends Vue {
  skills: {
    id: string;
    name: string;
    quote: string;
    description: string;
  }[] = [
    {
      id: 'wizard-skill',
      name: '巫师',
      quote: '可能只是给对手喂了芙蓉秘制小汉堡。',
      description: '对手有15%的概率获得5回合的"毒药"效果。',
    },
    {
      id: 'gamble-king-skill',
      name: '777',
      quote: '敢问您的17张牌能不能秒了我。',
      description: `攻击者在攻击阶段有40%的概率触发。
  丢一枚硬币。若结果为正面，本轮攻击被攻击者的防御无效；若结果为反面，攻击者在攻击前生命值减少最大生命值的30%`,
    },
    {
      id: 'language-influence-skill',
      name: '语言感化',
      description: '被攻击者有20%的概率下一轮无法攻击；被攻击者有30%的概率下一轮攻击力降低50%。',
      quote: '来自祖安人的亲切问候。',
    },
    {
      id: 'thunder-skill',
      name: '雷电法术',
      description: '被攻击者有15%的概率获得"雷电法术: 雷阵雨"效果。',
      quote: '准备好...感受雷电的力量了吗？',
    },
    {
      id: 'healing-skill',
      name: '治疗术',
      description: '攻击者在攻击阶段有50%的概率恢复自身生命值最大值的15%。',
      quote: '生与死，仅在一瞬。',
    },
  ];

  buffs: {
    id: string;
    name: string;
    quote: string;
    description: string;
  }[] = [
    {
      id: 'gamble-king-defence-lost-effect-buff',
      name: '777: 飞机攻势',
      description: '玩家的防御无效。',
      quote: '给这位玩家倒一杯卡布奇诺。',
    },
    {
      id: 'language-influence-freezed-buff',
      name: '语言感化: 禁锢',
      description: '玩家本轮无法攻击。',
      quote: '创建文明和谐素质社会。',
    },
    {
      id: 'language-influence-weaken-buff',
      name: '语言感化: 虚弱',
      description: '玩家本轮攻击力减弱50%。',
      quote: '这份粗口有点龙门的味道。',
    },
    {
      id: 'poison-buff',
      name: '毒药',
      description: '玩家每轮攻击开始前生命值扣除最大值的10%。',
      quote: '来自炎熔的同情。',
    },
    {
      id: 'thunder-buff',
      name: '雷电法术：雷阵雨',
      description: '攻击阶段，玩家有50%的概率生命值减半。',
      quote: '也许这就是命运吧...',
    },
  ];
}
</script>
