<template>
<div>
  <div class="block">
    <p>自动选择开始时间</p>
    <p>默认开始时间为今天</p>
    <el-date-picker ref="datePicker"
      v-model="value"
      type="datetimerange"
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
        value: ''
      };
    },
    methods: {
      onFocus() {
        const dateRef = this.$refs.datePicker
        const pickerRef = dateRef.picker
        if (pickerRef) {
          if (this.focusLock) return
          this.focusLock = true
          let startElem = pickerRef.$el.querySelector('.start-date')
          if (!startElem) {
            startElem = pickerRef.$el.querySelector('.today')
          }

          setTimeout(() => {
            console.log('点击')
            startElem.click()
          }, 200)
        }
      },
      onBlur() {
        this.focusLock = false
      }
    }
  };
</script>
