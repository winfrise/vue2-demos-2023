<template>
  <div class="virtual-list-select">
    <div class="list-container">
      <div slot="empty" v-if="dataSources.length === 0">
        暂无数据
      </div>
      <virtual-list v-else ref="virtualList" class="scroll" style="height: 100%; overflow-y: auto;"
        :extraProps="{...extraProps, currentIndex}"
        :data-key="dataKey"
        :data-sources="dataSources"
        :data-component="dataComponent"
        @mouseenter.native="onMouseenter"
        @mouseleave.native="onMouseleave"
      />
    </div>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
export default {
  name: 'VirtualListSelect',
  components: {
    VirtualList
  },
  props: {
    selectedList: {
      type: Array,
      default: () => ([])
    },
    dataKey: {
      type: String,
      default: 'id'
    },
    dataList: {
      type: Array,
      default: () => ([])
    },
    dataComponent: {
      required: true
    },
    extraProps: {
      type: Object,
      default: () => ({})
    },
    itemHeight: {
      // 需要注意上下外边距叠加问题
      type: Number,
      default: 60
    }
  },
  watch: {
    dataList: {
      handler() {
        // this.dataSources = this._.cloneDeep(this.dataList)
        this.dataSources = this.dataList
        this.selectedList.forEach(item => {
          const index = this.dataSources.findIndex(sourceItem => sourceItem[this.dataKey] === item[this.dataKey])
          if (index >= 0) {
            this.dataSources[index].checked = true
          }
        })
      },
      immediate: true
    }
  },
  data() {
    return {
      dataSources: [],
      currentIndex: -1
    }
  },
  created() {
    this.$on('selectChange', (value, source, index) => {
      this.currentIndex = index
      this.$set(source, 'checked', value)
      // 实现方法一
      // this.$set(this.dataSources, index, source)
      // 实现方法二
      this.dataSources.splice(index, 1, source)
      // 修改选中数据
      const selectIndex = this.selectedList.findIndex(item => {
        return item[this.dataKey] === source[this.dataKey]
      })
      if (value && selectIndex < 0) {
        const selectedList = [...this.selectedList]
        selectedList.push(source)
        this.$emit('update:selectedList', selectedList)
      }
      if (!value && selectIndex >= 0) {
        const selectedList = [...this.selectedList]
        selectedList.splice(selectIndex, 1)
        this.$emit('update:selectedList', selectedList)
      }
    })
  },
  methods: {
    clearSelect(item) {
      if (item) {
        const index = this.dataSources.findIndex(source => item[this.dataKey] === source[this.dataKey])
        if (index >= 0) {
          const dataItem = this.dataSources[index]
          this.$set(this.dataSources, index, {...dataItem, checked: false})
        }
      }
    },
    onMouseenter() {
      this.isInner = true
      this.enableUpDown = true
      document.addEventListener('keydown', this.handleKeyUpOrDown)
      document.addEventListener('click', this.handleClickDoc)
    },
    onMouseleave() {
      this.isInner = false
    },
    handleClickDoc() {
      if (!this.isInner) {
        this.enableUpDown = false
        document.removeEventListener('click', this.handleClickDoc)
        document.removeEventListener('keydown', this.handleKeyUpOrDown)
      }
    },
    handleKeyUpOrDown (e) {
        e.preventDefault()

        const list = this.dataSources

        if (e.key === 'ArrowUp') {
          if (this.currentIndex > 0) {
            this.currentIndex = this.currentIndex - 1
          }
        } else if (e.key === 'ArrowDown') {
          if (this.currentIndex < list.length - 1) {
            this.currentIndex = this.currentIndex + 1
          }
        } else if (e.key === 'Enter') {
          const item = this.dataSources[this.currentIndex]
          const value = !item.checked
          this.$emit('selectChange', value, item, this.currentIndex)
        }

        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
          const itemHeight = this.itemHeight
          const clientSize = this.$refs.virtualList.getClientSize()
          const visibleCount = Math.floor(clientSize / itemHeight) - 1

          const scrollTop = this.$refs.virtualList.$el.scrollTop

          const visibleStartIndex = Math.ceil(scrollTop / itemHeight)
          const visibleEndIndex = visibleStartIndex + visibleCount

          if (this.currentIndex > visibleEndIndex) {
            this.$refs.virtualList.scrollToIndex(this.currentIndex - visibleCount)
          } else if (this.currentIndex < visibleStartIndex) {
            this.$refs.virtualList.scrollToIndex(this.currentIndex)
          }
        }
    },
  }
}
</script>

<style lang="scss" scoped>
  .virtual-list-select {
    height: 100%;
  }
  .list-container {
    height: 100%;
  }

</style>
