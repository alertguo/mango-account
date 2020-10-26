<template>
  <Layout>
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`"
                   class="tag">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <Button @click.native="createTag">
      新建标签
    </Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Button from '@/components/Button.vue';

tagListModel.fetch();
@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
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
