<template lang="pug">
  div.inner-page
    div.page
      div.title Кухонные шкафы по индивидуальным размерам
      div.constructor
        div.column.preview
          canvas3d
</template>

<script>
  import Canvas3d from "@/components/constructor3d/Canvas3d";

  export default {
  name: "ViewModule3D",
    components: {Canvas3d}
  }
</script>

<style lang="scss">

.column {
  display: flex;
  flex-direction: column;

}

.constructor {
  padding-top: 24px;
  padding-bottom: 24px;
}

.preview {
  width: 70%;
}

.config {
  width: 30%;
}

.page {
  width: 1200px;
  margin: 0 auto;

  .title {
    font-weight: bold;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0.4px;
    color: #23252A;
  }

  .constructor {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
