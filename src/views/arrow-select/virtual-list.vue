<template>
  <div style="height: 500px;">
    <VirtualListSelect ref="virtualSelectList"
      :selectedList.sync="selectedList"
      :extraProps="{isCheckbox: true}"
      data-key="id"
      :data-list="dataList"
      :data-component="ItemComponent"
    >
      <template v-slot:bottomText="{selectNum, total}">
        <span style="margin-left: 10px;">{{total}}条，已选{{selectNum}}条</span>
      </template>
    </VirtualListSelect>
  </div>
</template>

<script>
import VirtualListSelect from './components/VirtualListSelect.vue'
import ItemComponent from './components/ItemComponent'
export default {
  name: 'VirtualListDemo',
  components: {
    VirtualListSelect,
  },
  computed: {
    virtualList() {
      return this.$refs.virtualSelectList
    },
  },
  data() {
    this.ItemComponent = ItemComponent
    return {
      selectedList: [],
      dataList: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.getList()
    },
    async getList() {
      this.loading = true
      setTimeout(() => {
        const resList = new Array(100).fill({}).map((_, index) => ({id: index + 1, text: `文本${index + 1}`}))
        this.dataList = resList
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .friend-list {
    height: calc(100% - 324px);
    overflow-y: auto;
    font-size: 12px;
  }
  .friend-item {
    display: flex;
    padding: 10px 0;
    .friend-item-inner {
      display: flex;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    .info {
      margin-left: 10px;
      .nickname {
        color: #101010;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 115px;
      }
      .remark {
        color: #bbb;
        margin-top: 7px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 115px;
      }
    }
  }
  .control-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    line-height: 52px;
    padding: 0 20px;
    color: rgba(96, 98, 102, 1);
    border-top: 1px solid #DCDFE6;
  }
</style>
