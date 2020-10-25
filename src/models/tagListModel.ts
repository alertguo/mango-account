const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type tagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  save: () => void;
}
const tagListModel: tagListModel = {
  data: [],
  // 获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  // 创建标签
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) { return 'duplicated'; }
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;