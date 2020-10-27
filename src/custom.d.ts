type RecordItem = {
  tags: string[];
  formItem: string;
  type: string;
  amount: number; // 上面的都是数据类型
  createdAt?: Date; // 类 / 构造函数
}
type Tag = {
  id: string;
  name: string;
}
type tagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not-found';
  remove: (id: string) => boolean;
  save: () => void;
}

