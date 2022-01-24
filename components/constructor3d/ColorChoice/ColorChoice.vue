<template lang="pug">
	modal(
		v-if="!!items.length"
		v-bind="options"

		@opened="openModal"
		@before-close="clearData"

	)
		div.modal.modal-color
			span.modal__close(@click="$modal.hide(options.name)")
				ui-icon-close.modal__icon
			div.modal__container.modal-color__general
				div.modal-color__item
					img.modal-color__image(v-if="constructorCode === 'window'" :src="activeItem.img")
					div.modal-color__image(v-else)
						main-image(v-bind="activeItemImageProps")
					div.modal-color__result
						p.modal-color__name-color {{ activeItem.name }}
						ui-button.modal-color__button(text="Выбрать" @click="save")
			div.modal__container.modal-color__items
				div.modal__search(v-if="isVisibleSearch")
					div.modal__tooltip-wrapp
						ui-tooltip(
							:mouseEvents="false"
							text="Цвет не найден"
							handlePosition="bottom-right"
							width="142px"
							:handleShow="showTooltip"
							inverted
						)
					ui-input(
						v-model="colorValue"
						id="colorCode"
						label="Код цвета"
						name="colorCode"
						type="text"
						:mask="$_sh_getMask('colorCode')"
						:validator="$_cf_validateColorCode"
						@set-error="(id, value) => codeColorError = value"
					)
				div.modal__images.scrollbar-secondary(ref="colorScroll" :class="{'modal__images_color': isVisibleSearch}")
					div.modal__wrapper(ref="colors")
						div.modal__block(v-for="item in items" :key="item.id")
							input.modal__hidden.modal__input(
								v-model="modelId"
								:value="item.id"
								type="radio"
								name="color"
								:id="item.id"
								@click="setActiveItem"
							)
							label.modal__slide.images(:for="item.id")
								//img.modal-color__image(v-if="constructorCode === 'window'" :src="item.img")
								//main-image.images__item(v-else v-bind="getActiveItem(item)")
								div.images__description
									span.images__text {{ item.name }}
</template>

<script>
import { UiIconClose, UiButton, UiInput, UiTooltip } from "@aksonorg/design"
const MainImage = () => import("../MainImage")

export default {
	name: "ColorChoice",
	components: {
		MainImage,
		UiIconClose,
		UiInput,
		UiButton,
		UiTooltip,
	},
	props: {
		title: {
			type: String,
		},
		items: {
			type: Array,
			required: true,
		},
		preview: {
			type: Boolean,
			default: true,
		},
		modalName: {
			type: String,
			default: "ColorChoice",
		},
		selectedSlide: {
			type: Number,
			default: 1
		},
		colorKey: {
			type: Number,
			default: 0
		},
		openInfo: {
			type: String,
			default: "showActive"
		},
		from: {
			type: String,
			default: ""
		},
		constructorCode: {
			type: String,
			default: "",
		}
	},
	data() {
		return {
			model: "",
			options: {
				name: this.modalName,
				delay: 300,
				width: 1144,
				height: "auto",
				styles: {
					"border-radius": "8px",
					"box-shadow": "0px 0px 8px rgba(0, 0, 0, 0.08), 0px 16px 20px rgba(0, 0, 0, 0.16)",
				},
			},
			caption: "",
			colorValue: "",
			codeColorError: false,
			showTooltip: false,
		}
	},
	computed: {
		modelId: {
			get() {
				if (this.items[0] && (!this.model || !this.colorIds.includes(this.model))) return this.items[0].id
				return this.model
			},
			set(v) {
				this.model = v
			}
		},
		activeItem() {
			return this.items.find(({ id }) => id === this.modelId)
		},
		activeItemImage() {
			return typeof this.activeItem.imageDetail === "function"
				? this.activeItem.imageDetail
				: typeof this.activeItem.img === "function"
					? this.activeItem.img
					: {}
		},
		activeItemImageProps() {
			if (typeof this.activeItemImage === "function") {
				const propsObject = this.activeItemImage({ h: 512 })
				return typeof propsObject === "object" ? propsObject : {}
			} else {
				return this.activeItemImage
			}
		},
		colorIds() {
			return this.items.map(({ id }) => id)
		},
		colorName() {
			return this.items.find(({ name }) => this.colorValue === name) || {}
		},
		indexSearchActiveColor() {
			return this.items.findIndex(({ name }) => this.colorValue === name) !== -1
				? this.items.findIndex(({ name }) => this.colorValue === name)
				: this.items.findIndex(({ active }) => active)
		},
		isVisibleSearch() {
			return this.constructorCode === "curtain"
		},
		isValidColorCode() {
			return !!this.$_cf_validateColorCode(this.colorValue)
		}
	},
	watch: {
		items() {
			this.setModelId()
		},
		colorValue(value, valueOld) {
			this.showTooltip = false
			if (value !== valueOld) {
				if (this.isValidColorCode) {
					this.searchColor()
				}
			}
		}
	},
	methods: {
		openModal() {
			this.scrollToActiveColorItem()
		},
		getActiveItem(item) {
			return item.img !== "" ? item.img({ w: 160 }) : {}
		},
		setModelId() {
			this.modelId = (this.items.find(({ active }) => active) || this.items[0] || {}).id
		},
		save() {
			this.$emit("save", this.activeItem)
			this.close()
		},
		close() {
			this.$modal.hide(this.options.name)
		},
		clearData() {
			this.colorValue = ""
		},
		searchColor() {
			if (Object.keys(this.colorName).length > 0) {
				this.modelId = this.colorName.id
				this.scrollToActiveColorItem()
			} else {
				this.showTooltip = true
			}
		},
		setActiveItem() {
			this.colorValue = ""
		},
		scrollToActiveColorItem(behavior = "smooth") {
			const { $refs: { colors, colorScroll } } = this
			const colorElements = colors.childNodes || []
			const offsetHeightBox = colorScroll.offsetHeight
			const thresholdUp = offsetHeightBox / 1.5
			const offsetTopBox = colorScroll.offsetTop
			const scrollTopBox = colorScroll.scrollTop
			let offsetTopElements = []
			if (colorElements.length > 0) {
				colorElements.forEach((element) => {
					offsetTopElements.push(element.offsetTop)
				})
				if (scrollTopBox === 0 && offsetTopElements[this.indexSearchActiveColor] >= thresholdUp || scrollTopBox !== 0) {
					colorScroll.scrollTo({
						behavior,
						top: offsetTopElements[this.indexSearchActiveColor] - offsetTopBox,
					})
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import "@aksonorg/design/lib/variables/_groups.scss";

.modal {
	padding: 48px 32px 48px 48px;
	background-color: white;

	&__container {
		position: relative;
	}

	&__close {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 16px;
		right: 16px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: $background_color_secondary;
		transition: background-color 0.2s ease;
		cursor: pointer;
		z-index: 1;

		&:hover {
			background: $background_color_accent;
		}
	}

	&__icon {
		width: 18px;
		height: 18px;
	}

	&__images {
		height: 512px;
		overflow-y: scroll;
	}

	&__images_color {
		height: 440px;
	}

	&__wrapper {
		display: flex;
		flex-wrap: wrap;
		column-gap: 16px;
	}

	&__block:nth-child(n+4) {
		position: relative;
		margin-top: 16px;
	}

	&__hidden {
		display: none;
	}

	&__input:checked + label {
		padding: 2px;
		border: 2px solid $theme_primary;

		.images__item {
			border-radius: 4px;
		}

		.images__description {
			left: 2px;
			right: 2px;
			bottom: 2px;
		}
	}

	&__search {
		position: relative;
		width: 160px;
		margin-bottom: 16px;
	}

	&__tooltip-wrapp {
		position: absolute;
		left: 22px;
		bottom: -5px;
	}
}

.modal-color {
	display: flex;
	flex-wrap: nowrap;
	column-gap: 24px;

	&__general {
		max-width: 512px;
		width: 100%;
		overflow: hidden;
	}

	&__items {
		max-width: 528px;
		width: 100%;
	}

	&__item {
		height: 512px;
		position: relative;
		background: $background_color_primary;
	}

	&__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
		border: 2px solid $border_color_primary;
	}

	&__result {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		left: 2px;
		right: 2px;
		bottom: 2px;
		padding: 16px;
		background: rgba(0, 0, 0, 0.24);
		border-radius: 0 0 4px 4px;
	}

	&__name-color {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: 0.32px;
		color: $text_color_inversion;
	}
}

.images {
	display: block;
	width: 160px;
	height: 160px;
	position: relative;
	box-sizing: border-box;
	border-radius: 8px;
	transition: all 0.1s ease-in;
	overflow: hidden;
	cursor: pointer;

	&__item {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	&__description {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 4px 8px;
		text-align: center;
		background: rgba(0, 0, 0, 0.24);
		border-radius: 0 0 4px 4px;
	}

	&__text {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.2px;
		color: $text_color_inversion;
	}
}
</style>