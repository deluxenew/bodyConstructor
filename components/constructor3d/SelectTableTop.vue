<template lang="pug">
	div.select-elements
		div.select-elements__header
			div.select-elements__title(@click="toggleOpen") Столешница
				img.select-elements__chevron(
					:src="require('./img/chevron.svg')"
					:class="{reverse: !opened}"
				)
			//div.select-elements__remove(
			//	v-if="value"
			//	@click="removeItem"
			//)
			//	span Убрать столешницы
			//	img.select-elements__icon(:src="require('./img/close.svg')")
			//div.select-elements__remove(
			//	v-else
			//	@click="addTableTop"
			//)
			//	span Добавить
			//	img.select-elements__icon.select-elements__icon-add(:src="require('./img/close.svg')")
		transition-expand
			div.select-elements__group(v-show="opened")
				div.select-elements__tabs
					div.select-elements__tabs-item(
						v-for="item in materialVariants"
						:class="{active: currentMaterial && item.code === currentMaterial.code}"
						@click="selectMaterial(item)"
					)
						div.tab__title {{item.name}}
				div.select-elements__tabs.select-elements__buttons
					| Толщина:
					div.select-elements__tabs-item.select-elements__buttons-item(
						v-for="item in thicknessVariants"
						:class="{active: currentThickness &&  item.code === currentThickness.code}"
						@click="selectThickness(item)"
					)
						div.tab__title {{item.name}}
				horizontal-list-items(
					:items="colorVariants"
					:currentItemCode="currentColor && currentColor.code"
					@selectItem="selectItem"
				)
</template>

<script>
import UiInputCheckbox from "./UiInputCheckbox.vue"
import TransitionExpand from "./TransitionExpand.vue"
import HorizontalListItems from "./HorizontalListItems.vue"

export default {
	name: "SelectTabletop",
	components: { TransitionExpand, UiInputCheckbox, HorizontalListItems },
	props: {
		elementVariants: {
			type: Array,
			default: () => [],
		},
		options: {
			type: Array,
			default: () => [],
		},
		textures: {
			type: Array,
			default: () => [],
		},
		selectedBox: {
			type: Object,
			default: null,
		},
		selectedTableTop: {
			type: Object,
			default: null,
		},
		value: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			currentMaterial: null,
			currentThickness: null,
			currentColor: null,
			opened: false,
		}
	},
	watch: {
		selectedBox(v) {
			if (v) this.opened = false
		},
		selectedTableTop(v) {
			if (v) this.opened = true
		},
	},
	computed: {
		materialVariants() {
			return this.options && this.options
				.filter(({ category }) => category === "material")
		},
		thicknessVariants() {
			return this.options && this.options
				.filter(({ dependency, category, code }) => {
					const isType = category === "thickness"
					const material = this.currentMaterial && this.currentMaterial.code
					const findMaterial = dependency && dependency
						.find(({ code, values }) => code === "material" && material && values.includes(material))

					return isType && findMaterial
				})
		},
		colorVariants() {
			return this.options && this.options
				.filter(({ dependency, category, code }) => {
					const isType = category === "color"
					const thickness = this.currentThickness && this.currentThickness.code
					const findThickness = dependency && dependency
						.find(({ code, values }) => code === "thickness" && thickness && values.includes(thickness))

					return isType && findThickness
				})
		},
		materialObj() {
			return this.materialVariants && this.materialVariants.find(({ code }) => code === this.currentMaterial.code)
		},
		colorObj() {
			return this.colorVariants && this.colorVariants.find(({ code }) => code === this.currentColor.code)
		},
		imageUrl() {
			const item = this.textures && this.textures.find(({ code }) => this.currentColor.code === code)
			if (item) return `https://cdn.akson.ru/webp${item.path}0.png`
			return ""
		},
		materialRestrictions() {
			const currentMaterial = this.materialVariants.find(({ code }) => code === this.currentMaterial.code)
			if (currentMaterial) {
				const { maxWidth, minWidth } = currentMaterial.restrictions.limitSize
				return {
					maxWidth,
					minWidth
				}
			}
			return {
				maxWidth: 0,
				minWidth: 0
			}
		},
		config() {
			return {
				type: this.currentMaterial.code,
				height: this.currentThickness.code / 100,
				color: this.currentColor.code,
				url: this.imageUrl,
				maxWidth: this.materialRestrictions.maxWidth,
				minWidth: this.materialRestrictions.minWidth,
				colorTitle: this.colorObj ? this.colorObj.name : "",
				materialType: this.materialObj ? this.materialObj.name : ""
			}
		},
	},
	methods: {
		async addTableTop() {
			await this.selectMaterial(this.materialVariants[0])
			this.opened = true
		},
		async toggleOpen() {
			this.opened = !this.opened
			if (this.opened && !this.value && this.materialVariants[0]) {
				await this.selectMaterial(this.materialVariants[0])
			}
		},
		removeItem() {
			this.$emit("remove")
			this.currentColor = null
		},
		async selectMaterial(item) {
			if (this.currentMaterial && this.currentMaterial.code === item.code) return
			this.currentMaterial = item
			await this.$nextTick()
			const firstThicknessVariant = this.thicknessVariants[0]
			if (firstThicknessVariant) await this.selectThickness(firstThicknessVariant)
		},
		async selectThickness(item) {
			this.currentThickness = item
			await this.$nextTick()
			const firstColor = this.colorVariants[0]
			if (firstColor) await this.selectItem(firstColor)
		},
		selectItem(item) {
			if (!item) return
			this.currentColor = item
			this.$emit("selectColor", this.config)
		},
	},
}
</script>

<style lang="scss" scoped>
.select-elements + .select-elements {
	padding-top: 24px;
}

.select-elements {
	width: 100%;

	&__icon {
		flex: 0 0 24px;
		margin-left: 8px;
		transition: .2s ease;

		&-add {
			transform: rotate(45deg);
		}
	}

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
		user-select: none;

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

	&__buttons {
		padding-top: 16px;
		justify-content: flex-start;
		align-items: center;
		font-size: 16px;
		line-height: 24px;
		color: #454A54;

		&-item {
			margin-left: 16px;
			flex-grow: 0;
			border-bottom: none;
			border-radius: 4px;
			font-size: 16px;
			line-height: 22px;
			color: #454A54;

			&.active {
				background-color: #0099DC;
				border-bottom: none;
				font-style: normal;
				font-weight: normal;
				color: #ffffff;
			}
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
