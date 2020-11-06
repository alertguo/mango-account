import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    setCurrentTag(state, id: string) {
      store.commit('fetchTag');
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTag');
        }
      } else {
        return 'not-found';
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTag');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList?.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {name: '餐饮', type: '-', svg: '餐饮'});
        store.commit('createTag', {name: '购物', type: '-', svg: '购物'});
        store.commit('createTag', {name: '交通', type: '-', svg: '交通'});
        store.commit('createTag', {name: '日用', type: '-', svg: '日用'});
        store.commit('createTag', {name: '其他', type: '-', svg: '其他'});
        store.commit('createTag', {name: '工资', type: '+', svg: '工资'});
      }
    },
    createTag(state, newTag: NewTag) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(newTag.name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = createId().toString();
      state.tagList.push({id, name: newTag.name, type: newTag.type, svg: newTag.svg});
      store.commit('saveTag');
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
  actions: {},
  modules: {}
});

export default store;