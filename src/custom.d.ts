type RecordItem = {
  tags: Tag[];
  formItem: string;
  type: string;
  amount: number; // 上面的都是数据类型
  createdAt?: string; // 类 / 构造函数
}
type Tag = {
  id: string;
  name: string;
}
type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
}

