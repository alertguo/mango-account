<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <div class="notes">
      <Icon name="remark"/>
      <FormItem :value.sync="record.formItem"
                class="formItem"
                field-name="备注："
                placeholder="点击写备注..."
      />
    </div>
    <div class="createAt">
      <Icon name="remark"/>
      <FormItem :value.sync="record.createdAt"
                class="formItem"
                field-name="日期："
                placeholder="点击写日期..."
                type="datetime-local"
      />
    </div>
    <Tags :value="record.type" @update:value="record.tags = $event"/>
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
    tags: [{id: '', name: '', type: '-', svg: '',}],
    formItem: '',
    type: '-',
    amount: 0,
    createdAt: new Date().toISOString()
  };
  selectedTags: string[] = [];
  recordTypeList = recordTypeList;

  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecord');
  }

  saveRecord() {
    this.record.tags = JSON.parse(window.localStorage.getItem('selectedTags') || '[]');
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.formItem = '';
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

  .notes, .createAt {
    display: flex;
    align-items: center;
    padding-left: 8px;

    .formItem {
      flex-grow: 1;
      padding: 2px 0;
    }
  }
}
</style>
