<template>
  <div class="item-inner">
    {{source.text}}
  </div>
</template>

<script>
export default {
  name: 'ItemInner',
  props: {
    source: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
