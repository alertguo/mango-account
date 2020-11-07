<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"/>
    <label>
      <Icon name="皮卡丘"/>
      <input type="text">
    </label>
    <div>
      <h3>
        请选择图标
      </h3>
      <ul>
        <li>
          <div class="tag-wrapper">
            <Icon name="皮卡丘"/>
            <Icon name="游戏"/>
          </div>
        </li>
      </ul>
      <button>
        保存新标签
      </button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class AddTag extends Vue {
  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>

</style>