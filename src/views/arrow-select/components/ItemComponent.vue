<template>
  <label class="item-wrapper"
        :class="{
          'item-checkbox': isCheckbox,
          'item-checked': isCheckbox && source.checked,
          'active': index === currentIndex
        }"
  >
    <el-checkbox v-if="isCheckbox"
                v-model="source.checked"
                @change="val => dispatch('VirtualListSelect', 'selectChange', val, source, index)"
    ></el-checkbox>

    <ItemInner :source="source" :index="index"
      :style="{
        'margin-left': isCheckbox ? '10px' : '0px',
        width: isCheckbox ? 'calc(100% - 30px)' : '100%'
      }"
     />

     <div class="close-btn" v-if="!isCheckbox" @click="handleRemove">
      <i class="el-icon-circle-close"></i>
     </div>
  </label>
</template>

<script>
import ItemInner from './ItemInner'
export default {
  name: 'ItemComponents',
  components: {
    ItemInner
  },
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {}
      }
    },
    isCheckbox: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    handleRemove() {
      const nick = this.source.friendName || this.source.chatRoomNick
      this.$confirm(`是否删除【${nick}】`, '提示')
        .then(() => {
          this.dispatch('MessageForwardDialog','removeItem', this.source)
        })
    },
    dispatch(componentName, eventName, ...rest) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(rest))
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover, &.item-checked {
    background: #eee;
  }
  &.active {
    background: #ccc;
  }
  .close-btn {
    padding: 5px;
    font-size: 14px;
    display: none;
    &:hover {
      color: #66b1ff;
    }
  }
  &:hover {
    .close-btn {
      display: block;
    }
  }

}

::v-deep {
  .el-checkbox {
    &.is-checked {
      color: #3766F4;
    }
  }
}

</style>
