<template>
  <div>
    <label class="formItem">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'datetime-local'">
        <input :placeholder="placeholder"
               :type="type || 'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)">
      </template>
      <template v-else>
        <input :placeholder="placeholder"
               :type="type || 'text'"
               :value="value"
               maxlength="5"
               @input="onValueChanged($event.target.value)">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DDTHH:mm:ss');
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 4px;
  display: flex;
  align-items: center;

  input {
    height: 24px;
    background: transparent;
    flex-grow: 1;
    border: none;
    padding-right: 16px;
  }
}
</style>