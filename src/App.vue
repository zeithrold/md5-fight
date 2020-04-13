<template>
  <m-main></m-main>
</template>

<script lang="ts">
import Vue from 'vue';
import MMain from './components/MMain.vue';
// import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  components: {
    'm-main': MMain,
  },
  data: () => ({
    //
  }),
});
</script>
