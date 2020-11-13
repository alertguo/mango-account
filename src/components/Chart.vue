<template>
  <div ref="wrapper" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import echarts, {EChartOption} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options: EChartOption;

  mounted() {
    console.log(this.options);
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 400px;
  }
</style>