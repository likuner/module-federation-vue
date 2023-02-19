<template>
  <lazy-img class="lazy-img" :src="imgSrc" width="500" />
</template>

<script>
import lu from '@/assets/lu.png'

export default {
  name: 'LazyImage',
  setup() {
  },
  data() {
    return {
      imgSrc: lu
    }
  }
}
</script>

<style lang="less" scoped>
.lazy-img{
  margin: 0 0 0 0;
}
</style>
