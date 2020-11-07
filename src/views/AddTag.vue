<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"/>
    <div class="form-wrapper">
      <Icon name="皮卡丘"/>
      <FormItem field-name=""
                placeholder="输入标签名（不超过五个字）"/>
    </div>
    <div class="tags">
      <h3>
        选择图标
      </h3>
      <ul class="current">
        <li v-for="tag in commonTagList" :key="tag.index">
          <div class="icon-wrapper">
            <Icon :name="tag.name"/>
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
import FormItem from '@/components/Money/FormItem.vue';

@Component({
  components: {FormItem, Tabs}
})
export default class AddTag extends Vue {
  type = this.$route.query.type;
  recordTypeList = recordTypeList;
  commonTagList = [
    {index: 1, name: '皮卡丘'},
    {index: 2, name: '游戏'}
  ];

  mounted() {
    console.log(this.$route.query.type);
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  align-items: center;
}

.current {
  display: flex;

  > li {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding-bottom: 16px;

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #d9d9d988;
      height: 36px;
      width: 36px;
      border-radius: 50%;

      .icon {
        width: 24px;
        height: 24px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
}
</style>