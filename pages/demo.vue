<template lang="pug">
  div.inner-page
    component( :is="componentName")
</template>

<script>
  export default {
    name: "demo",
    components: {
      Constructor3d: () => {
        if (process.browser) return import('@/components/constructor3d/ViewModule3D')
      }
    },
    computed: {
      componentName() {
        if (process.browser) return 'Constructor3d'
        return ''
      }
    }
  }
</script>

