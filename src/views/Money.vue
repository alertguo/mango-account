<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <div class="notes">
      <FormItem :value.sync="record.formItem"
                field-name="备注"
                placeholder="在这里输入备注"
      />
    </div>
    <Tags @update:value="record.tags = $event"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, FormItem, NumberPad, Tags},
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [], formItem: '', type: '-', amount: 0,
  };
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecord');
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.formItem = '';
      this.$store.commit('fetchTag');
    }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

  .notes {
    padding: 0;
  }
}
</style>
