<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >
        <div class="icon-wrapper">
          <Icon :name="tag.svg"/>
        </div>
        {{ tag.name }}
      </li>
      <li>
        <router-link :to="{path: '/labels/add',query: {type: value}}">
          <div class="add-tag">
            <Icon name="addTag"/>
          </div>
        </router-link>
        新增
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(String) value?: string;
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList.filter((item: { type: string }) => item.type === this.value);
  }

  created() {
    this.$store.commit('fetchTag');
    this.selectedTags.push(this.tagList[0]);
    this.saveSelectedTags();
  }

  @Watch('value')
  onValueChanged() {
    this.selectedTags = [];
    this.selectedTags.push(this.tagList[0]);
    this.saveSelectedTags();
  }

  toggle(tag: string) {
    this.selectedTags = [];
    this.selectedTags.push(tag);
    this.saveSelectedTags();
    this.$emit('update:value', this.selectedTags);
  }

  saveSelectedTags() {
    window.localStorage.setItem('selectedTags', JSON.stringify(this.selectedTags));
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #ffffff;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      display: flex;
      flex-direction: column;
      width: 25%;
      align-items: center;
      font-size: 14px;
      padding-bottom: 16px;

      .icon-wrapper, .add-tag {
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

      &.selected {
        .icon-wrapper {
          background: #ffda4488;
        }
      }


    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>