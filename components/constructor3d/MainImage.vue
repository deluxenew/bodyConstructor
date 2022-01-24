<template lang="pug">
	div.image-box(:style="styles")
		img.image(
			:src="src"
			:srcset="srcSetMainString"
			:alt="description"
			:width="width"
			:height="height"
			:draggable="draggable"
			:itemprop="itemprop"
			:loading="actionLoading"
			:class="{ 'image_restricted': restricted, 'image_cover': cover }"
			@load="onLoadImage"
			@error="onError"
		)
		div.loading(v-if="showLoader && imageLoading")
			ui-loader.loading__loader
</template>

<script>
import { UiLoader } from "@aksonorg/design"

export default {
	inheritAttrs: false,
	name: "MainImage",
	components: { UiLoader },
	props: {
		src: {
			type: String,
			required: true
		},
		srcSet: {
			type: Array,
			default: () => []
		},
		width: {
			type: [String, Number],
			required: false,
		},
		height: {
			type: [String, Number],
			required: false,
		},
		description: {
			type: String,
			default: ""
		},
		draggable: {
			type: Boolean,
			default: false
		},
		itemprop: {
			type: String
		},
		showLoader: {
			type: Boolean,
			default: false
		},
		lazy: {
			type: Boolean,
			default: true
		},
		restricted: {
			type: Boolean,
			default: true
		},
		cover: Boolean
	},
	data() {
		return {
			imgLoaded: false,
			imageLoading: false
		}
	},
	watch: {
		src(valueNew, valueOld) {
			if (valueNew !== valueOld) {
				this.imgLoaded = false
				this.setImageLoadingDeferred()
			}
		}
	},
	computed: {
		styles() {
			return {
				width: this.width ? `${this.width}px` : undefined,
				height: this.height ? `${this.height}px` : undefined,
			}
		},
		srcSetMainString() {
			return this.getSrcSetAsString(this.srcSet)
		},
		actionLoading() {
			return this.lazy ? "lazy" : "eager"
		}
	},
	mounted() {
		this.setImageLoadingDeferred()
	},
	methods: {
		getSrcSetAsString(srcSet) {
			return (srcSet || [])
				.map(({ src, dpr }) => {
					return `${src} ${dpr}x`
				})
				.join(",")
		},
		onLoadImage() {
			this.imgLoaded = true
			this.imageLoading = false
			this.$emit("load", {})
		},
		onError() {
			this.imgLoaded = true
			this.imageLoading = false
			this.$emit("error", {})
		},
		setImageLoadingDeferred() {
			// делаем отображение лоадера отложенным, чтобы не показывать его в случае,
			// когда изображение уже имеется в кэше браузера
			setTimeout(() => {
				if (!this.imgLoaded) {
					this.imageLoading = true
				}
			}, 200)
		}
	}
}
</script>

<style lang="scss" scoped>
.image-box {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	height: 100%;
}

.image {
	&_restricted {
		max-width: 100%;
		max-height: 100%;
	}

	&_cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.7);

	&__loader {
		width: 50px;
		height: 50px;
	}
}
</style>