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
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3>{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }}
              {{ item.createdAt }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>


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

  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    const {recordList} = this;
    type HashTableValue = { title: string; items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  created() {
    this.$store.commit('fetchRecord');
  }
}
</script>


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