<template>
  <Layout>
    <Tabs :data-source="recordTypeList"
          :value.sync="newTag.type"/>
    <div class="form-wrapper">
      <div class="selected-wrapper">
        <Icon :name="selectedTags[0].name"/>
      </div>
      <FormItem :value="newTag.name"
                class="formItem"
                field-name=""
                placeholder="输入标签名（不超过五个字）"
                @update:value="editInput"/>
    </div>
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
        <button @click="createTag(newTag)">
          保存新标签
        </button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import FormItem from '@/components/Money/FormItem.vue';
import commonTagList from '@/constants/commonTagList';
import TagHelper from '@/mixins/TagHelper';
import mixins from 'vue-class-component';

type SelectedTags = {
  index: number;
  name: string;
}

@Component({
  components: {FormItem, Tabs}
})
export default class AddTag extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  commonTagList = commonTagList;
  selectedTags: SelectedTags[] = [this.commonTagList[0]];
  newTag: NewTag = {name: '', type: this.$route.query.type, svg: this.selectedTags[0].name};

  toggle(tag: SelectedTags) {
    this.selectedTags = [];
    this.selectedTags.push(tag);
    this.newTag.svg = this.selectedTags[0].name;
  }

  editInput(value: string) {
    if (value.length >= 0 && value.length <= 5) {
      this.newTag.name = value;
    }
    if (value.length > 5) {
      this.newTag.name = value.substring(0, 5);
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