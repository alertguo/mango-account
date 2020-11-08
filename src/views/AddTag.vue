<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="type"/>
    <div class="form-wrapper">
      <div class="selected-wrapper">
        <Icon :name="selectedTags[0].name"/>
      </div>
      <FormItem :value="inputContent"
                class="formItem"
                field-name=""
                placeholder="输入标签名（不超过五个字）"
                @update:value="editInput"/>
    </div>
    {{ selectedTags }}
    <div class="tags">
      <h3 class="title">
        选择图标
      </h3>
      <ul class="current">
        <li v-for="tag in commonTagList"
            :key="tag.index"
            :class="{selected: selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">
          <div class="icon-wrapper">
            <Icon :name="tag.name"/>
          </div>
        </li>
      </ul>
      <div class="button-wrapper">
        <button @click="addTag">
          保存新标签
        </button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import FormItem from '@/components/Money/FormItem.vue';

type SelectedTags = {
  index: number;
  name: string;
}
const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component({
  components: {FormItem, Tabs}
})
export default class AddTag extends Vue {
  type = this.$route.query.type;
  recordTypeList = recordTypeList;
  inputContent = '';
  commonTagList = [
    {index: 0, name: '皮卡丘'},
    {index: 1, name: '皮卡丘'},
    {index: 2, name: '游戏'},
    {index: 7, name: '皮卡丘'},
    {index: 8, name: '游戏'},
    {index: 10, name: '游戏'},
    {index: 6, name: '游戏'},
    {index: 9, name: '游戏'},
    {index: 5, name: '游戏'},
    {index: 4, name: '游戏'},
    {index: 3, name: '游戏'},
    {index: 11, name: '皮卡丘'},
    {index: 21, name: '游戏'},
    {index: 71, name: '皮卡丘'},
    {index: 81, name: '游戏'},
    {index: 101, name: '游戏'},
    {index: 61, name: '游戏'},
    {index: 91, name: '游戏'},
    {index: 51, name: '游戏'},
    {index: 41, name: '游戏'},
    {index: 311, name: '游戏'},
    {index: 411, name: '游戏'},
    {index: 321, name: '游戏'}
  ];
  selectedTags: SelectedTags[] = [this.commonTagList[0]];

  toggle(tag: SelectedTags) {
    this.selectedTags = [];
    this.selectedTags.push(tag);
  }

  editInput(value: string) {
    if (value.length >= 0 && value.length <= 5) {
      this.inputContent = value;
    }
    // console.log('----');
    // console.log('value');
    // console.log(value);
    // console.log(this.inputContent);
    if (value.length > 5) {
      this.inputContent = value.substring(0, 5);
      // console.log(value);
      // console.log(this.inputContent.length);
    }
  }

  addTag() {
    if (this.inputContent.length === 0) {return window.alert('标签名不能为空');}

    const newTag = {
      name: this.inputContent,
      type: this.type,
      svg: this.selectedTags[0].name
    };
    this.$store.commit('createTag', newTag);
    if (this.$store.state.createTagError) {
      if (this.$store.state.createTagError.message === 'tag name duplicated') {
        window.alert(map[this.$store.state.createTagError.message] || '未知错误');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.form-wrapper {
  @extend %innerShadow;
  display: flex;
  align-items: center;
  padding: 16px 32px;

  .selected-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffda4488;
    height: 36px;
    width: 36px;
    border-radius: 50%;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .formItem {
    padding-bottom: 0;
    padding-left: 8px;
  }

}

.tags {
  padding: 16px;

  .title {
    padding-bottom: 16px;
    padding-left: 16px;
  }

  .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20%;
      padding-bottom: 16px;

      &.selected {
        .icon-wrapper {
          background: #ffda4488;
        }
      }

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
        }
      }
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
}
</style>