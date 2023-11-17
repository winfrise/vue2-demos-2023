<template>
  <div>
    <el-input v-model="value" @input="onInput"></el-input>
    <div>{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'NumberDouble',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onInput(value) {
      // input输入框可以输入小数点后2位的正数
      console.log('--------')
      console.log('val', value)
      // 替换不是【数字、点】
      value = value.replace(/[^\d.]/g, '')
      console.log('val', value)

      value = value.replace(/\.{2,}/g, '.')
      console.log('val', value)

      // 把点替换为 $#$
      value = value.replace('.', '$#$')
      console.log('val', value)


      // 全局把点替换为空
      value = value.replace(/\./g, '')

      // 把$#$替换为点
      value = value.replace('$#$', '.')

      // 拼接
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')


      value = value.replace(/^\./g, '')
    },
    onInput1(value) {
      // 限制数量只能为正整数或者负整数，且开头不为0
      value=/^-$|^-?[1-9][0-9]*$/.test(value)?value:''
    },
    onInput2(value) {
      // 只能输入正整数不为0，且不保留小数点
      value = value.replace(/^(0+)|[^\d]+/g,'')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
