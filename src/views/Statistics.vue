<template>
  <Layout>
    <Types class-prefix="xxx" :value.sync="yyy"/>
  </Layout>
</template>

<style lang="scss" scoped>
::v-deep li {
  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';

@Component({
  components: {Types}
})
export default class Statistics extends Vue {
  yyy = '-';
}
</script>

