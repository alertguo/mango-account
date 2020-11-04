<template>
  <div>
    <label class="formItem">
      <Icon name="remark"/>
      <span class="name">{{ this.fieldName }}</span>
      <input :placeholder="placeholder"
             :value="value"
             type="text"
             @input="onValueChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop(String) placeholder?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 8px;
  display: flex;
  align-items: center;

  .name {
    padding-left: 4px;
  }

  input {
    height: 44px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>