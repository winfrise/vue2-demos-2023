<template>
  <div class="page-cont">
    <div class="list-box">
      <VirtualListSelect ref="virtualSelectList"
        data-key="id"
        :data-list="dataList"
        :selectedList.sync="selectedList"
        :extraProps="{}"
        :data-component="ItemComponent"
      >

      </VirtualListSelect>
    </div>

    <div class="list-box">
      <VirtualListSelect ref="virtualSelectList"
        data-key="id"
        :data-list="selectedList"
        :extraProps="{}"
        :data-component="ItemComponent"
      >
      </VirtualListSelect>
    </div>
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
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-cont {
    display: flex;
    .list-box {
      width: 400px;
      height: 600px;
      border: 1px solid #eee;
      margin: 20px;
      padding: 20px;
    }
  }
</style>
