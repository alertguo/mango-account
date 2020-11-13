<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"
          class-prefix="type"/>
    <div ref="chartWrapper" class="chart-wrapper">
      <Chart :options="x" class="chart"/>
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
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
    <div v-else class="noResult">
      您目前还没有相关的记账
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Chart, Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  get x() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      // 获取到30天的日期
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      // 找到对应的日期的值,不存在则为0
      const found = _.find(this.groupedList, {
        title: dateString
      })?.total | 0;
      array.push({
        date: dateString, value: found
      });
    }
    // 排序
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    const keys = array.map(item => item.date);
    const values = array.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        data: keys,
        lineStyle: {
          color: '#333'
        }
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [{
        symbol: 'circle',
        symbolSize: 10,
        data: values,
        type: 'line',
        lineStyle: {
          color: '#333',
          width: 1
        },
        itemStyle: {
          color: '#ffda44',
          borderColor: '#333',
        },
      }],
      tooltip: {
        show: true,
        triggerOn: 'click',
        formatter: '{c}',
        position: 'top',
      }
    };
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    type Result = [{ title: string; total?: number; items: RecordItem[] }]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = 99999;
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(now, 'day')) {
      return '今天';
    } else if (dayjs(string).isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (dayjs(string).isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (dayjs(string).isSame(now, 'year')) {
      return day.format('M月DD日');
    } else {
      return day.format('YYYY年M月DD日');
    }
  }

  tagString(tags: Tag[]) {
    return tags.map(t => t.name).join('，');
  }

  created() {
    this.$store.commit('fetchRecord');
  }
}
</script>


<style lang="scss" scoped>
.chart {
  width: 430%;
  max-height: 50vh;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .type-tabs-item {
    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }
}

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