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
            @removeItem="removeItem"
            @setCases="kitchen.order.cases = $event"
            @setConfigName="kitchen.currentConfig.name = $event"
          )
        div.column.config
          select-case(
            v-model="kitchen.currentConfig.caseConfig"
            :elementVariants="boxes"
            @selectItem="selectCaseConfig"
            @remove="$refs.kitchen.removeCase()"
          )
          select-facade(
            v-model="kitchen.currentConfig.facadeConfig"
            :parentVariants="parentVariants"
            :elementVariants="facades"
            @remove="$refs.kitchen.removeCase()"
            @selectItem="selectFacadeConfig"
            @selectColor="selectFacadeColor"
            @selectChildConfig="selectChildConfig"
          )
          select-table-top(
            v-model="kitchen.currentConfig.tableTopConfig"
            :elementVariants="[]"
            @remove="$refs.kitchen.removeCase()"
          )
      calculate-order(
        :kitchen="kitchen"
        @removeItem="removeItem"
      )

</template>

<script>

  import boxes from './CasesListConfig.js'
  import facades from './FacadesListConfig'
  import Module from './module'
  import SelectCase from './SelectCase.vue'
  import SelectFacade from './SelectFacade.vue'
  import SelectTableTop from './SelectTableTop.vue'
  import CalculateOrder from "./CalculateOrder";

  export default {
    name: 'constructor3d',
    components: {
      CalculateOrder,
      Module,
      SelectCase,
      SelectFacade,
      SelectTableTop
    },
    data() {
      return {
        caseConfig: null,
        facadeConfig: null,
        tableTopConfig: null,
        kitchen: {
          currentConfig: {
            caseConfig: {
              name: ''
            },
            facadeConfig: {
              name: '',
              width: 0,
              height: 0,
              colorId: ''
            },
            tableTopConfig: {

            },
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
        const { cases } = boxes
        return cases
      },
      parentVariants() {
        const variants = this.caseConfig?.userData?.variants
        const parentId = this.caseConfig?.userData?.parent?.id

        if (parentId) {
          let result = []
          const parent =  boxes[parentId]
          if (parent) {
            const parentVariants = parent.userData.variants

            parentVariants.forEach((el) => {
              const fn = boxes[el.id]
              result.push(fn)
            })
            return result
          }
        }

        if (variants && variants.length) {
          let result = []
          variants.forEach((el) => {
            const fn = boxes[el.id]
            result.push(fn)
          })
          return result
        }

        return []
      },
      facades() {
        const { colors } = facades

        return colors
      }
    },
    watch: {
      'kitchen.currentConfig.caseConfig.name'(v) {
        this.caseConfig = boxes[v]
      },
    },
    methods: {
      removeItem({uuid, type}) {
        this.$refs.kitchen.removeItem({uuid, type})
        const idx = this.kitchen.order[type].findIndex((el) => el.uuid === uuid)
        if (idx > -1) this.kitchen.order[type].splice(idx, 1)
      },
      selectChildConfig(v) {
        this.caseConfig = v
        this.kitchen.currentConfig.facadeConfig.name = v && v.userData && v.userData.parent ? v.name : ''
      },
      selectCaseConfig(v) {
        this.caseConfig = v

      },
      selectFacadeConfig(v) {
        // this.facadeConfig = v
      },
      selectFacadeColor() {

      }
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
