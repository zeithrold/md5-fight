<template>
  <m-dialog title="捐助" subtitle="请 Zeithrold 一杯咖啡吧T^T" dialogid="donate">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h1>制作不易，麻烦各位姥爷们请杯咖啡吧T^T</h1>
        </v-col>
        <v-col cols="12">
          <p>MD5-Fight的制作仅凭一人完成，肝了很多个日夜。</p>
          <p>同时您正在访问的云服务费用对于一个学生党来说有点承受不起</p>
          <p>看在这么勤勤恳恳做的份上麻烦各位姥爷们请一杯咖啡捐点服务器费用吧T^T</p>
          <p>
            <i>——某贫穷学生党Zeithrold如此卑微的说到</i>
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <img src="https://storage.zeithrold.com/donation/alipay.jpg" alt width="100%" />
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <img src="https://storage.zeithrold.com/donation/wechat.jpg" alt width="100%" />
        </v-col>
      </v-row>
    </v-container>
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
export default class MDonateDialog extends Vue {}
</script>
