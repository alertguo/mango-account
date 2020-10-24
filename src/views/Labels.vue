<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>衣</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="right"/>
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">
        新建标签
      </button>
    </div>
  </Layout>
</template>

<script lang="ts">

export default {
  name: 'Labels',
};
</script>
<style lang="scss" scoped>
.tags {
  background: #ffffff;
  font-size: 16px;
  padding-left: 16px;

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 16px;
      height: 16px;
      color: #666666;
      margin-right: 16px;
    }
  }
}

.createTag {
  background: #767676;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
