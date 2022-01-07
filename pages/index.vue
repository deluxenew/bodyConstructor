<template lang="pug">
  div.inner-page
    component( :is="componentName")
</template>

<script>

export default {
  name: 'IndexPage',
  components: {
    Constructor3d: () => import('@/components/constructor3d/Constructor3d'),
  },
  computed: {
    componentName() {
      if (process.browser) return 'Constructor3d';
      return '';
    },
  },
};
</script>
