import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    return recordListModel.create(record);
  },
  // tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id, name) => {
    return tagListModel.update(id, name);
  },
  findTag: (id) => {
    return window.store.tagList.filter(t => t.id === id)[0];
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
