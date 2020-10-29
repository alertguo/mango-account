<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名"
                placeholder="在这里输入标签名"
                @update:value="update"/>
    </div>
    <Button @click="remove">
      删除标签
    </Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import oldStore from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {
    this.tag = oldStore.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      oldStore.updateTag(this.tag.id, name);
    }
  }

  remove() {
    if (this.tag) {
      if (oldStore.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert('删除失败');
      }
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > svg {
    width: 16px;
    height: 16px;
  }

  > .rightIcon {
    width: 16px;
    height: 16px;
  }
}

.form-wrapper {
  background: #ffffff;
  margin-top: 8px;
}
</style>