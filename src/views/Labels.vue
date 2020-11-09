<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"/>
    <div class="tags">
      <router-link v-for="tag in tagList" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`"
                   class="tag">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <router-link :to="{path: '/labels/add',query: {type}}">
      <Button>
        新建标签
      </Button>
    </router-link>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList.ts';

@Component({
  components: {Tabs, Button},
})
export default class Labels extends mixins(TagHelper) {
  type = '-';
  recordTypeList = recordTypeList;

  get tagList() {
    return this.$store.state.tagList.filter((item: { type: string }) => item.type === this.type);
  }

  beforeCreate() {
    this.$store.commit('fetchTag');
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background: #ffffff;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 16px;
      height: 16px;
      color: #666666;
      margin-right: 16px;
    }
  }
}
</style>
