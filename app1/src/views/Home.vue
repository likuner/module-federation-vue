<template>
<h1>
{{msg}}
</h1>
<LazyImage @click="handleClick"/>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
import LazyImage from '@/components/LazyImage'

export default {
  name: 'Home',
  components: {
    LazyImage
  },
  data() {
    return {
      msg: this.$globalProperty
    }
  },
  setup() {
    const handleClick = () => {
      document.documentElement.style.setProperty(
        '--primary-color',
        ['red', 'green', 'blue'][Math.floor(Math.random() * 3)]
      )
      // console.log('styleSheets', document.styleSheets)
    }

    consola.info('setup:', getCurrentInstance().appContext.config.globalProperties.$globalProperty)

    onMounted(() => {
      consola.info('onMounted:', getCurrentInstance().appContext.config.globalProperties.$globalProperty)
    })

    return {
      handleClick
    }
  },
  created() {
    consola.info('created:', this.$globalProperty)
  },
  mounted() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
    consola.info('mounted: --primary-color', primaryColor)
  }
}
</script>

<style lang="less" scoped>
  h1{
    background-color: @bg-color;
    color: var(--primary-color);
    &::before {
      content: '\270C';
    }
    &::after {
      content: '\2764';
    }
  }
</style>
