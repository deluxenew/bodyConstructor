<template lang="pug">
	div.select-elements
		div.select-elements__header
			div.select-elements__title(@click="toggleOpen") Фасад
				img.select-elements__chevron(
					:src="require('./img/chevron.svg')"
					:class="{reverse: !opened}"
				)
			div.select-elements__remove(
				:class="{disabled: !selectedFacadeVariant && !currentFacade}"
				@click="removeItem"
			)
				span Убрать
				img(:src="require('./img/close.svg')")
		transition-expand
			div.select-elements__group(v-show="opened")

				div.select-elements__tabs
					div.select-elements__tabs-item(
						v-for="item in materialVariants"
						:class="{active: currentMaterial && item.code === currentMaterial.code}"
						@click="selectCurrentMaterial(item)"
					)
						div.tab__title {{item.name}}
							ui-tooltip(:text="item.description")
								img.tab__icon(:src="require('./img/question.svg')")

				horizontal-list-items(
					v-if="facadeVariants.length > 1"
					:items="facadeVariants"
					:currentItemCode="currentFacade && currentFacade.code"
					@selectItem="selectFacadeVariant"
				)

				div.select-elements__tabs
					div.select-elements__tabs-item(
						v-for="item in materialTypeVariants"
						:class="{active: currentMaterialType && item.code === currentMaterialType.code}"
						@click="selectCurrentMaterialType(item)"
					)
						div.tab__title {{item.name}}
							ui-tooltip(v-if="item.description" :text="item.description")
								img.tab__icon(:src="require('./img/question.svg')")

				horizontal-list-items(
					:items="colorVariants"
					:currentItemCode="currentColor && currentColor.code"
					@selectItem="selectFacadeColor"
				)

				//div.select-elements__list
				//  ui-input-checkbox(
				//    v-if="currentItem"
				//    v-model="applyForAllCases"
				//    label="Применить изменения для всех шкафов"
				//  )
</template>

<script>
import { UiTooltip } from "@aksonorg/design"
import HorizontalListItems from "./HorizontalListItems.vue"
import UiInputCheckbox from "./UiInputCheckbox.vue"
import TransitionExpand from "./TransitionExpand.vue"

export default {
	name: "SelectFacade",
	components: { TransitionExpand, UiInputCheckbox, UiTooltip, HorizontalListItems },
	props: {
		caseModelCode: {
			type: String,
			default: "",
		},
		selectedFacadeVariant: {
			type: String,
			default: "",
		},
		selectedFacadeColor: {
			type: String,
			default: "",
		},
		selectedFacadeMaterial: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: () => [],
		},
		value: {
			type: Object,
			default: () => {
			},
		},
	},
	data() {
		return {
			applyForAllCases: false,
			opened: true,

			currentMaterial: null,
			currentFacade: null,
			currentMaterialType: null,
			currentColor: null
		}
	},
	computed: {
		valueModel: {
			get() {
				return this.value || null
			},
			set(v) {
				this.$emit("input", v)
			},
		},
		materialVariants() {
			return this.options && this.options
				.filter(({ category, code }) => category === "facade_material" && code !== "none") || []
		},
		facadeVariants() {
			return this.options && this.options
				.filter(({ category, dependency }) => {
					const isFacadeVariant = category === "facade_variant"
					const body = this.caseModelCode
					const material = this.currentMaterial && this.currentMaterial.code
					const findBody = dependency && dependency
						.find(({ code, values }) => code === "body" && body && values.includes(body))
					const findMaterial = dependency && dependency
						.find(({ code, values }) => code === "facade_material" && material && values.includes(material))
					return isFacadeVariant && findBody && findMaterial
				}) || []
		},
		materialTypeVariants() {
			return this.options && this.options
				.filter(({ category, code, dependency }) => {
					const isType = category === "facade_type" && code !== "none" && code !== "varnished"
					const material = this.currentMaterial && this.currentMaterial.code
					const findMaterial = dependency && dependency
						.find(({ code, values }) => code === "facade_material" && material && values.includes(material))
					return isType && findMaterial
				}) || []
		},
		colorVariants() {
			return this.options && this.options
				.filter(({ category, code, dependency }) => {
					const isType = category === "facade_color" && code !== "none"
					const material = this.currentMaterialType && this.currentMaterialType.code
					const facade = this.currentFacade && this.currentFacade.code
					const findFacade = dependency && dependency
						.find(({ code, values }) => code === "facade_variant" && facade && values.includes(facade))
					const findMaterialType = dependency && dependency
						.find(({ code, values }) => code === "facade_type" && material && values.includes(material))
					return isType && findMaterialType && findFacade
				}) || []
		},
		materialModel: {
			get() {
				return this.value && this.value.materialCode || this.currentMaterial.code
			},
			set(v) {
				this.currentMaterial = v
			},
		},
		facadeModel: {
			get() {
				return this.currentFacade || this.selectedFacadeVariant
			},
			set(v) {
				this.currentFacade = v
			}
		},
		config() {
			return {
				materialCode: "ldsp",
				materialTitle: "ЛДСП",
				facadeVariant: "one",
				materialTypeCode: "Frezer",
				materialTypeTitle: "Фрезерованный",
				colorCode: "colorCode",
				colorTitle: "дуб Вотан"
			}
		},
	},
	watch: {
		value: {
			deep: true,
			handler(v) {
				if (v) {
					const material = this.materialVariants.find(({ code }) => code === v.materialCode)
					if (material) this.currentMaterial = material
					const facadeVariant = this.facadeVariants.find(({ code }) => code === v.facadeVariant)
					if (facadeVariant) this.currentFacade = facadeVariant
				}
			},
		},
	},
	methods: {
		toggleOpen() {
			this.opened = !this.opened
		},
		removeItem() {
			this.currentFacade = null
		},
		async selectCurrentMaterial(item) {
			this.currentMaterial = item
			// if (!this.currentFacade) {
			await this.$nextTick()
			const firstFacadeVariant = this.facadeVariants[0]
			if (firstFacadeVariant) await this.selectFacadeVariant(firstFacadeVariant)
			// }
		},
		async selectFacadeVariant(item) {
			this.currentFacade = item
			// if (!this.currentMaterialType) {
			await this.$nextTick()
			const firstMaterialType = this.materialTypeVariants[0]
			if (firstMaterialType) await this.selectCurrentMaterialType(firstMaterialType)
			// }
		},
		async selectCurrentMaterialType(item) {
			this.currentMaterialType = item
			// if (!this.currentColor) {
			await this.$nextTick()
			const firstFacadeColor = this.colorVariants[0]
			if (firstFacadeColor) this.selectFacadeColor(firstFacadeColor)
			// }
		},
		selectFacadeColor(item) {
			this.currentColor = item
			this.$emit("selectColor", this.config)
		},
	},
}
</script>

<style lang="scss" scoped>
@import "@aksonorg/design/lib/index.css";

.select-elements + .select-elements {
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
		cursor: pointer;
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

.tab {
	&__title {

	}

	&__icon {
		margin-left: 8px;
	}
}
</style>
