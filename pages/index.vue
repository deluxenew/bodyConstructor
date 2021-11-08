<template lang="pug">
  div.inner-page
    div.page
      div.title Кухонные шкафы по индивидуальным размерам
      div.constructor
        div.column.preview
          module(
            ref="kitchen"
            v-model="kitchen"
            :caseConfig="caseConfig"
            @selectCase="selectCase"
            @removeItem="removeItem"
          )
        div.column.config
          select-elements(
            v-model="caseConfig"
            title="шкаф"
            :elementVariants="boxes"
            @remove="$refs.module.removeCase()"
          )
      calculate-order(
        :kitchen="kitchen"
        @removeItem="removeItem"
      )

</template>

<script>

  import boxes from '~/components/constructor3d/CasesListConfig.js'
  import Module from '~/components/constructor3d/module'
  import SelectElements from '~/components/constructor3d/SelectElements.vue'
  import CalculateOrder from "../components/constructor3d/CalculateOrder";

  export default {
    components: {
      CalculateOrder,
      Module,
      SelectElements
    },
    data() {
      return {
        caseConfig: null,
        kitchen: {
          currentConfig: {
            caseConfig: null,
            tableTopConfig: null,
            facadeConfig: null,
          },
          order: {
            cases: [],
            facades: [],
            tableTops: []
          }
        }
      }
    },
    computed: {
      boxes() {
        let result = []
        for (let i = 0; i < Object.keys(boxes).length; i++) {
          result.push(boxes[Object.keys(boxes)[i]])
        }
        return result.filter(el => el.name)
      }
    },
    methods: {
      removeItem({uuid, type}) {
        this.$refs.kitchen.removeItem({uuid, type})
        const idx = this.kitchen.order[type].findIndex((el) => el.uuid === uuid)
        if (idx > -1) this.kitchen.order[type].splice(idx, 1)

      },
      selectCase(val) {
        console.log(val);
      },
    },

  }
</script>

<style lang="scss">

.column {
  display: flex;
  flex-direction: column;

}

.constructor {
  padding-top: 24px;
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
