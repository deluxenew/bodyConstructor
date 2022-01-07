<template lang="pug">
  div.select-elements(v-if="options")
    div.select-elements__header
      div.select-elements__title Шкаф
        img.select-elements__chevron(
          :src="require('./img/chevron.svg')"
          :class="{reverse: !opened}"
          @click="toggleOpen"
        )
      div.select-elements__remove(
        :class="{disabled: !selectedBox}"
        @click="removeItem"
      )
        span Убрать
        img(:src="require('./img/close.svg')")
    transition-expand
      div.select-elements__group(v-show="opened")
        div.select-elements__tabs
          div.select-elements__tabs-item(
            v-for="item in typeVariants"
            :class="{active: item.code === currentTypeModel}"
            @click="selectCurrentType(item)"
          )
            div.tab__title {{item.name}}
        horizontal-list-items(
          :items="bodyVariants"
          :currentItemCode="currentItemModel"
          :selectedBox="selectedBox"
          @selectItem="selectItem"
        )
</template>

<script>
import TransitionExpand from "./TransitionExpand.vue"
import HorizontalListItems from "./HorizontalListItems"

export default {
	name: "SelectCase",
	components: { HorizontalListItems, TransitionExpand },
	props: {
		title: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: () => [],
		},
		selectedBoxType: {
			type: String,
			default: "",
		},
		selectedBox: {
			type: Object,
			default: null,
		},
		value: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			currentType: null,
			currentItem: null,
			opened: true,
		}
	},
	computed: {
		typeVariants() {
			return this.options && this.options.filter(({ category }) => category === "type")
		},
		bodyVariants() {
			return this.options && this.options.filter(({ category, restrictions }) => category === "body" && restrictions.type.includes(this.currentTypeModel)).sort((a, b) => {
				if (a.code > b.code) return -1
				if (a.code < b.code) return 1
				if (a.code === b.code) return 0
			})
		},
		selectedCase() {
			return this.value
		},
		currentTypeModel: {
			get() {
				return this.currentType || this.selectedBoxType || this.typeVariants && this.typeVariants[0].code
			},
			set(v) {
				this.currentType = v
				if (!this.selectedCase) this.currentItemModel = this.bodyVariants[0].code
			},
		},
		currentItemModel: {
			get() {
				return this.currentItem || this.bodyVariants && this.bodyVariants[0].code || null
			},
			set(v) {
				this.currentItem = v
			},
		},
	},
	watch: {
		selectedBox(v) {
			if (v) this.currentItemModel = v.name.replaceAll("_", "-")
		},
		value: {
			handler(v) {
				this.currentItemModel = v.replaceAll("_", "-")
				const el = this.options.find(({ code }) => code === this.currentItemModel)
				if (el) this.currentTypeModel = el.restrictions.type[0]
			},
		},
		currentTypeModel(v) {
			if (v) this.$emit("selectType", v)
		},
	},
	methods: {
		toggleOpen() {
			this.opened = !this.opened
		},
		removeItem() {
			if (this.value && this.selectedBox) this.$emit("remove")
		},
		selectCurrentType(item) {
			this.currentTypeModel = item.code
			this.currentItemModel = this.bodyVariants && this.bodyVariants[0].code.replaceAll("_", "-")
			this.$emit("selectType", item.code)
			this.$emit("discardSelectBox")
			this.$emit("selectItem", this.currentItemModel)
		},
		selectItem(item) {
			this.currentItemModel = item.code
			this.$emit("selectItem", this.currentItemModel)
		},
	},
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

    &__item + &__item +  &__item{
      margin-top: 8px;
    }

    &__item {
      margin-left: 8px;
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

      &.disabled:not(&.active) {
        opacity: 0.5;
      }
    }
    &__img {
      width: 100px;
      padding-bottom: 20px;
    }
  }
</style>
