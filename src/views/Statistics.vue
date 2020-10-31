<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"
          class-prefix="type"/>
    <Tabs :data-source="intervalList"
          :value.sync="interval"
          class-prefix="interval"/>
    <div>
      type: {{ type }}
      <br/>
      interval: {{ interval }}
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Types}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

