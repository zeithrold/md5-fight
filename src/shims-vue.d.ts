/* eslint import/no-unresolved: "off", import/extensions: "off" */

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module 'vuetify/lib' {
  import 'vuetify/types/lib';
}
