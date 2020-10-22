<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
    @Prop(Number) readonly xxx: number | undefined;
    // Prop 告诉 Vue , xxx 不是 data 数据，而是 prop
    // Number 告诉 Vue , xxx 运行时是个 Number(Vue不支持小写的number)
    // xxx 是属性名
    // number | undefined 告诉 TS xxx 的编译时类型

  type = '-'; //'-'表示支出，'+'表示收入
  selectType(type: string) { // type 只能是 '-' 和 '+' 中的一个
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }
  mounted(){
    if(this.xxx === undefined){
      console.log('没有xxx');
    }else{
      console.log(this.xxx.toString());
    }
  }
}
// export default {
//   name: 'types',
//   props: ['xxx'],
//   data() {
//     return {
//       type: '-' // '-'表示支出，'+'表示收入
//     }
//   },
//   mounted(){
//     console.log(this.xxx)
//   },
//   methods: {
//     selectType(type) { // type 只能是 '-' 和 '+' 中的一个
//       if (type !== '-' && type !== '+') {
//         throw new Error('type is unknown')
//       }
//       this.type = type
//     }
//   },
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333333;
    }
  }
}
</style>