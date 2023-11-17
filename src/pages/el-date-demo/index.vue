<template>
<div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>

  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker ref="datePicker"
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @focus="onFocus"
      @blur="onBlur"
    >
    </el-date-picker>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {

        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
      };
    },
    methods: {
      onFocus() {
        const dateRef = this.$refs.datePicker
        const pickerRef = dateRef.picker
        if (pickerRef) {
          if (this.focusLock) return
          this.focusLock = true
          const todayElem = pickerRef.$el.querySelector('.today')
          console.log(todayElem)
          setTimeout(() => {
            console.log('点击')
            todayElem.click()
          }, 200)
        }
      },
      onBlur() {
        console.log('blur')
        this.focusLock = false
      }
    }
  };
</script>
