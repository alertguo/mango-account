const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type tagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not-found';
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
  // 更新标签
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not-found';
    }
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};

export default tagListModel;