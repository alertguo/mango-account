import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
  createTag(newTag: NewTag) {
    if (newTag.name.length === 0) {return window.alert('标签名不能为空');}
    this.$store.commit('createTag', newTag);
    if (this.$store.state.createTagError) {
      if (this.$store.state.createTagError.message === 'tag name duplicated') {
        window.alert(map[this.$store.state.createTagError.message] || '未知错误');
      }
    }else {
      window.alert('添加成功')
    }
  }
}

export default TagHelper;