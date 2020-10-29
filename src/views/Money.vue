<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="onUpdateFormItem"
      />
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Tags from '@/components/Money/Tags.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';


@Component({
  components: {FormItem, NumberPad, Types, Tags},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [], formItem: '', type: '-', amount: 0,
  };

  created() {
    this.$store.commit('fetchRecord');
  }

  onUpdateFormItem(value: string) {
    this.record.formItem = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;

  .notes {
    padding: 10px 0;
  }
}
</style>
