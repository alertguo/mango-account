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
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.formItem }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: #ffffff;

  > .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
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

  tagString(tags){
    return tags.length === 0 ? '无' : tags.join('')
  }

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