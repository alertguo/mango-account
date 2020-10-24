const model = {
  // 获取数据
  fetch() {
    return JSON.parse(window.localStorage.getItem('recordList') || '[]')
  },
  // 保存数据
  save(data) {
    window.localStorage.setItem('recordList', JSON.stringify(data))
  }
}

export {model}