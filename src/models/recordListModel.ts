const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  // 获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  // 新增数据
  create(record: RecordItem) {
    const record2: RecordItem = recordListModel.clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default recordListModel;