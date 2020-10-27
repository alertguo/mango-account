import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store: Store = {
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
    return store.tagList.filter(t => t.id === id)[0];
  }
};
export default store;