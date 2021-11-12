<template lang="pug">
  div.select-elements
    div.select-elements__header
      div.select-elements__title Фасад
        img.select-elements__chevron(
          :src="require('./img/chevron.svg')"
          :class="{reverse: !opened}"
          @click="toggleOpen"
        )
      div.select-elements__remove(
        :class="{disabled: !selectedCase}"
        @click="removeItem"
      )
        span Убрать
        img(:src="require('./img/close.svg')")
    transition-expand
      div.select-elements__group(v-show="opened")
        div.select-elements__tabs
          div.select-elements__tabs-item(
            v-for="item in elementVariants"
            :class="{active: item.type === currentTypeModel.type}"
            @click="selectCurrentType(item)"
          )
            div.tab__title {{item.typeName}}
        div.select-elements__list(v-if="parentVariants.length")
          div.select-elements__item(
            v-for="item in parentVariants"
            :class="{active: currentParentVariant && item.name === currentParentVariant.name}"
            @click="selectParentVariant(item)"
          )
            //- img.select-elements__img(v-if="item.userData" :src="item.userData.img")
            //- | {{item && item.userData ? item.userData.form : ''}}

        div.select-elements__tabs.pt-16(v-if="currentParentVariant && currentTypeModel && currentTypeModel.variants")
          div.select-elements__tabs-item(
            v-for="variant in currentTypeModel.variants"
            :class="{active: variant.type === currentVariantModel.type}"
            @click="selectCurrentVariant(variant)"
          )
            div.tab__title {{variant.typeName}}
        div.select-elements__list(v-if="currentParentVariantModel && currentVariantModel && currentVariantModel.items && currentVariantModel.items.length")
          div.select-elements__item(
            v-for="color in currentVariantModel.items"
            :class="{active: currentItemModel && color.name === currentItemModel.name}"
            @click="selectCurrentColor(color)"
          )
            img.select-elements__img(v-if="color" :src="color.url")
            | {{color && color.name ? color.name : ''}}

        div.select-elements__list
          ui-input-checkbox(
            v-if="currentItem"
            v-model="applyForAllCases"
            label="Применить изменения для всех шкафов"
          )
</template>

<script>
import UiInputCheckbox from './UiInputCheckbox.vue'
import TransitionExpand from './TransitionExpand.vue'

export default {
  name: "SelectFacade",
  components: {TransitionExpand, UiInputCheckbox},
  props: {
    title: {
      type: String,
      default: ''
    },
    parentVariants: {
      type: Array,
      default: () => []
    },
    elementVariants: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      applyForAllCases: false,
      currentType: null,
      currentVariant: null,
      currentParentVariant: null,
      currentItem: null,
      opened: true
    }
  },
  watch:{
    parentVariants() {
      // this.currentParentVariant = this.currentParentVariant ? this.parentVariants[0] : null
      // if (this.currentItemModel) this.currentItemModel = this.currentVariantModel.items[0] || null
    },
    currentParentVariant(v) {
      if (!this.currentItemModel) this.currentItem = this.currentVariantModel.items[0]
    },
    currentItem(v) {
      // const item = {
      //   ...v,
      //   boxId: this.currentParentVariantModel?.name,
      //   type: this.currentTypeModel?.type,
      //   variant: this.currentVariantModel?.type
      // }
      // this.$emit('selectItem', item)
    },
    value: {
      deep: true,
      handler(v) {
        if (!!v?.name) {
          const caseBox = this.parentVariants.find((el) => v.name === el.name)
        }
        if (!!v.type) {
          const typeObj = this.elementVariants.find(({type}) => v.type === type)
          this.currentTypeModel = typeObj || null
        }
        if (!!v.variant) {
          const variantObj = this.currentTypeModel?.variants.find(({ type }) => v.variant === type)
          this.currentVariantModel = variantObj || null
        }
        if (!!v.colorId) {
          const colorObj = this.currentVariantModel?.items.find(({ id }) => v.colorId === id)
          this.currentItemModel = colorObj || null
        }
      }
    }
  },
  computed: {

    selectedCase() {
      return this.value.name
    },
    // значение первой вкладки
    currentTypeModel: {
      get() {
        return this.currentType || this.elementVariants[0]
      },
      set(v) {
        this.currentType = v
      }
    },
    // значение второй вкладки
    currentVariantModel: {
      get() {
        return this.currentVariant || (this.currentTypeModel?.variants && this.currentTypeModel?.variants[0]) || null
      },
      set(v) {
        this.currentVariant = v
      }
    },
    // значение варианта выбора фасада
    currentParentVariantModel: {
      get() {
        return this.currentParentVariant
      },
      set(v) {
        this.currentParentVariant = v
      }
    },
    // выбранный вариант конфига
    currentItemModel: {
      get() {
        return this.currentItem || null
      },
      set(v) {
        this.currentItem = v
      }
    },
    valueModel: {
      get() {
        return this.value || null
      },
      set(v) {
        this.$emit('input', v)
      }
    },
  },
  methods: {
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem () {
      this.currentParentVariant = null
      this.currentItem = null
      if (this.currentParentVariantModel) {
        const parent = this.currentParentVariantModel.userData.parent.id
        this.$emit('input', {name: parent})
      }
    },
    selectCurrentType(item) {
      this.currentTypeModel = item
      if (this.currentVariantModel) this.currentVariantModel = this.currentTypeModel.variants[0]
    },
    selectCurrentVariant(variant) {
      this.currentVariantModel = variant
      if (this.currentItemModel) this.currentItem = this.currentVariantModel.items[0]
    },
    selectParentVariant(config, ) {

      const item = this.currentItem ? this.currentItem : this.currentVariantModel.items[0]
      const color = {
        ...item,
        boxId: this.currentParentVariantModel?.name,
        type: this.currentTypeModel?.type,
        typeName: this.currentTypeModel?.typeName,
        variantType: this.currentVariantModel?.type,
        variantTypeName: this.currentVariantModel?.typeName,
        variant: this.currentVariantModel?.type
      }
       this.currentParentVariant = item
       this.$emit('selectChildConfig', {config, color})

      // this.currentParentVariantModel = item
    },
    selectCurrentColor(color) {
      this.currentItem = color
      const item = {
        ...color,
        boxId: this.currentParentVariantModel?.name,
        type: this.currentTypeModel?.type,
        typeName: this.currentTypeModel?.typeName,
        variantType: this.currentVariantModel?.type,
        variantTypeName: this.currentVariantModel?.typeName,
        variant: this.currentVariantModel?.type
      }
      this.$emit('selectColor', item)

    },
  },
  mounted() {
     this.$emit('selectItem', this.currentItemModel)
  }
}
</script>

<style lang="scss" scoped>
  .select-elements+ .select-elements {
    padding-top: 24px;
  }

  .select-elements {
    width: 100%;

    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    &__chevron {
      transition: .2s ease-in-out;
      cursor: pointer;

      &.reverse {
        transform: rotate(180deg);
      }
    }

    &__remove {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: .3s ease-in-out;

      &.disabled {
        opacity: .5;
      }

      &:hover:not(&.disabled) {
        text-decoration: underline;
      }
    }
    &__group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }

    &__tabs {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      &-item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 4px 8px;
        border-bottom: 2px solid #D5D7DC;
        transition: .3s ease-in-out;

        &.active {
          border-bottom: 2px solid #0099DC;
        }
      }

      &.pt-16 {
        padding-top: 16px;
      }
    }

    &__name {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      letter-spacing: 0.2px;
      color: #454A54;
    }

    &__list {
      padding-top: 16px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    &__item + &__item {
      margin-left: 8px;
    }

    &__item {
      border: 1px solid #D5D7DC;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-direction: column;
      width: 150px;
      height: 150px;
      cursor: pointer;
      transition: .3s ease-in-out;
      user-select: none;


      &.active {
        border: 2px solid #0099DC;
      }
    }
    &__img {
      width: 100px;
      padding-bottom: 20px;
    }
  }
</style>
