const localStorageKeyName = 'tagList';
type tagListModel = {
  data: string[];
  fetch: () => string[];
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
    if (this.data.indexOf(name) >= 0) { return 'duplicated'; }
    this.data.push(name);
    this.save();
    return 'success';
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;