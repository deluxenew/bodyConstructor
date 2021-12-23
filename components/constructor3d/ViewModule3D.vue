<template lang="pug">
  div.inner-page
    div.page
      div.title Кухонные шкафы по индивидуальным размерам
      div.constructor
        div.column.preview
          canvas3d(
            v-bind="canvas3DBind"
            @getBoxName="selectedBoxName = $event"
          )
        div.column.config
          select-case(
            v-model="kitchen.currentConfig.caseConfig"
            :options="bodyOptions"
            :selectedBoxName="selectedBoxName"
            @selectItem="selectCaseConfig"
            @remove="$refs.kitchen.removeCase()"
            @selectType="selectType"
            @sceneChange="caseConfig = $event"
          )
      //    select-facade(
      //      v-model="kitchen.currentConfig.facadeConfig"
      //      :parentVariants="parentVariants"
      //      :elementVariants="facades"
      //      @remove="$refs.kitchen.removeCase()"
      //      @selectItem="selectFacadeConfig"
      //      @selectColor="selectFacadeColor"
      //      @selectChildConfig="selectChildConfig"
      //    )
      //    select-table-top(
      //      v-model="kitchen.currentConfig.tableTopConfig"
      //      :elementVariants="tableTops"
      //      @selectColor="selectTableTopConfig"
      //    )
      //calculate-order(
      //  :kitchen="kitchen"
      //  @removeItem="removeItem"
      //)
</template>

<script>
import Canvas3d from "./Canvas3d";
import boxes from './models/boxes/BoxesList'
import facades from './FacadesListConfig'
import tableTops from './TableTopList'

import Module from './module'
import SelectCase from './SelectCase.vue'
import SelectFacade from './SelectFacade.vue'
import SelectTableTop from './SelectTableTop.vue'
import CalculateOrder from "./CalculateOrder";

export default {
  name: "ViewModule3D",
  components: {
    Canvas3d,
    CalculateOrder,
    Module,
    SelectCase,
    SelectFacade,
    SelectTableTop
  },
  data() {
    return {
      config: null,
      controlsVerticalPosition: 'bottom',
      caseModelCode: null,
      selectedBoxName: null,


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
            type: '',
            variant: '',
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
    bodyOptions() {
      return this.config && this.config.body.options || null
    },
    canvas3DBind() {
      return {
        controlsVerticalPosition: this.controlsVerticalPosition,
        caseModelCode: this.caseModelCode || '',
      }
    },
    boxes() {
      const { cases } = boxes
      return cases
    },
    parentVariants() {
      const variants = this.caseConfig?.userData?.variants
      const parentId = this.caseConfig?.userData?.parent?.id

      if (variants && variants.length) {
        let result = []
        variants.forEach((el) => {
          const fn = boxes[el.id]
          result.push(fn)
        })
        return result
      }

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

      return []
    },
    facades() {
      const { colors } = facades

      return colors
    },
    tableTops() {
      const { colors } = tableTops
      return colors
    },
  },
  watch: {
    'kitchen.currentConfig.caseConfig.name'(v) {
      // this.caseConfig = boxes[v]
    },
  },
  methods: {
    setConfigName(v) {
      this.kitchen.currentConfig.caseConfig.name = v
      if (v) this.caseConfig = boxes[v]
    },
    selectType() {
      this.caseConfig = null
    },
    removeItem({uuid, type}) {
      this.$refs.kitchen.removeItem({uuid, type})
      const idx = this.kitchen.order[type].findIndex((el) => el.uuid === uuid)
      if (idx > -1) this.kitchen.order[type].splice(idx, 1)
    },
    selectChildConfig({config, color}) {
      const {boxId, id, type, typeName, url, name, variantType, variantTypeName } = color

      const { userData: {doorWidth, doorHeight} } = config

      const group = config.children.find(({name}) => name === 'group')
      const doors = group.children.filter(({name}) => name === 'leftDoor' || name === 'rightDoor')

      doors.forEach((el) => {
        el.children[0].add(facades[type](id, doorWidth, doorHeight, url))
      })

      this.caseConfig = config

      this.caseConfig.userData.facadeCount = doors.length
      this.caseConfig.userData.facadeColorName = name
      this.caseConfig.userData.facadeColorId = id
      this.caseConfig.userData.facadeType = type
      this.caseConfig.userData.facadeTypeName = typeName
      this.caseConfig.userData.facadeVariantType = variantType
      this.caseConfig.userData.facadeVariantTypeName = variantTypeName

      this.kitchen.currentConfig.facadeConfig.name = config && config.userData && config.userData.parent ? config.name : ''
    },
    selectCaseConfig(v) {
      this.caseModelCode = v

    },
    selectFacadeConfig(v) {
      // this.facadeConfig = v
    },
    selectFacadeColor(color) {
      const { id, type, typeName, url, name, variantType, variantTypeName } = color
      const { userData: { doorWidth, doorHeight } } = this.caseConfig

      const group = this.caseConfig.children.find(({name}) => name === 'group')
      const doors = group.children.filter(({name}) => name === 'leftDoor' || name === 'rightDoor')

      doors.forEach((el) => {
        el.children[0].add(facades[type](id, doorWidth, doorHeight, url))
      })

      const temp = this.caseConfig.clone()
      this.caseConfig = temp

      this.caseConfig.userData.facadeCount = doors.length
      this.caseConfig.userData.facadeColorName = name
      this.caseConfig.userData.facadeColorId = id
      this.caseConfig.userData.facadeType = type
      this.caseConfig.userData.facadeTypeName = typeName
      this.caseConfig.userData.facadeVariantType = variantType
      this.caseConfig.userData.facadeVariantTypeName = variantTypeName
    },
    selectTableTopConfig(color) {
      const { id, type, maxWidth, typeName, url, name, variantType, variant } = color
      this.tableTopConfig = {}
      this.tableTopConfig.type = type
      this.tableTopConfig.height = variant
      this.tableTopConfig.color = id
      this.tableTopConfig.url = url
      this.tableTopConfig.maxWidth = maxWidth

    }
  },
  async mounted() {
    let response = await fetch('/kitchen.json');

    if (response.ok) {
      this.config = await response.json();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
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
