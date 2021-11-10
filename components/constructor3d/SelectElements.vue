<template lang="pug">
  div.select-elements
    div.select-elements__header
      div.select-elements__title {{title}}
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
        div.select-elements__list(v-if="currentParentVariantModel")
          div.select-elements__item(
            v-for="item in parentVariants"
            :class="{active: item.name === currentParentVariantModel.name}"
            @click="selectParentVariant(item)"
          )
            img.select-elements__img(v-if="item.userData" :src="item.userData.img")
            | {{item && item.userData ? item.userData.form : ''}}


        div.select-elements__list(v-if="currentTypeModel && currentTypeModel.items")
          div.select-elements__item(
            v-for="item in currentTypeModel.items"
            :class="{active: item.name === currentItemModel.name}"
            @click="currentItem = item"
          )
            img.select-elements__img(v-if="item.userData" :src="item.userData.img")
            | {{item && item.userData ? item.userData.form : ''}}

        div.select-elements__tabs.pt-16(v-if="currentTypeModel && currentTypeModel.variants")
          div.select-elements__tabs-item(
            v-for="variant in currentTypeModel.variants"
            :class="{active: variant.type === currentVariantModel.type}"
            @click="selectCurrentVariant(variant)"
          )
            div.tab__title {{variant.typeName}}
        div.select-elements__list(v-if="currentVariantModel && currentVariantModel.items && currentVariantModel.items.length")
          div.select-elements__item(
            v-for="color in currentVariantModel.items"
            :class="{active: color.name === currentItemModel.name}"
            @click="currentItem = color"
          )
            img.select-elements__img(v-if="color" :src="color.url")
            | {{color && color.name ? color.name : ''}}
</template>

<script>
import TransitionExpand from './TransitionExpand.vue'
export default {
  name: "SelectElements",
  components: {TransitionExpand},
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
      currentType: null,
      currentVariant: null,
      currentParentVariant: null,
      currentItem: null,
      opened: true
    }
  },
  watch:{
    parentVariants() {
      this.currentParentVariant = this.parentVariants[0] || null
      if (this.currentItemModel) this.currentItemModel = this.currentVariantModel.items[0] || null
      if (this.currentTypeModel.items) this.currentItem = this.currentTypeModel.items[0] || null
    },
    currentItem(v) {
      const item = {
        ...v,
        boxId: this.currentParentVariantModel?.name,
        type: this.currentTypeModel?.type,
        variant: this.currentVariantModel?.type
      }
      this.$emit('selectItem', item)
    },
    value: {
      deep: true,
      handler(v) {
        const item = this.currentTypeModel.items && this.currentTypeModel.items.find((el) => el.name === v.name)
        if (item) this.currentItem = item
        if (v.caseId) {
          const caseBox = this.parentVariants.find((el) => v.caseId === el.name)
          console.log(caseBox, 'caseBox');
          if (caseBox) this.currentParentVariantModel = caseBox
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
        return this.currentParentVariant || this.parentVariants[0]
      },
      set(v) {
        this.$emit('selectParent', v)
      }
    },
    // выбранный вариант конфига
    currentItemModel: {
      get() {
        return this.currentItem || (this.currentTypeModel?.items && this.currentTypeModel?.items[0]) || this.currentVariantModel?.items[0] || null
      },
      set(v) {
        const item = {
          ...v,
          boxId: this.currentParentVariantModel?.name,
          type: this.currentTypeModel?.type,
          variant: this.currentVariantModel?.type
        }
         this.$emit('selectItem', item)
      }
    }
  },
  methods: {
    toggleOpen() {
      this.opened = !this.opened
    },
    removeItem () {
      if (this.value) this.$emit('remove')
    },
    selectCurrentType(item) {
      this.currentTypeModel = item
      if (this.currentVariantModel) this.currentVariantModel = this.currentTypeModel.variants[0]
      if (this.currentTypeModel.items) this.currentItem = this.currentTypeModel.items[0] || null
    },
    selectCurrentVariant(variant) {
      this.currentVariantModel = variant
      if (this.currentItemModel) this.currentItemModel = this.currentVariantModel.items[0]
      if (this.currentTypeModel.items) this.currentItem = this.currentTypeModel.items[0] || null
    },
    selectParentVariant(item) {
       this.currentParentVariant = item
      // this.currentParentVariantModel = item
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
