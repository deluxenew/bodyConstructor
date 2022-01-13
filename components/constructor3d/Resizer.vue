<template lang="pug">
	div.resizer
		div.resizer__scale(ref="scale" @mousedown="scaleMDown")
			span.resizer__handler.handler(
				v-if="!onlyRuler"
				ref="handler"
				:style="handlerStyles"
				@mousedown="handlerActive = true"
			)
				span.handler__shadow
				span.handler__img
			span.resizer__limiter.resizer__limiter_type_min(v-if="!equalValues" :class="minLimiterClass") min {{ min }} мм
			span.resizer__limiter.resizer__limiter_type_max(:class="maxLimiterClass") max {{ max }} мм
</template>

<script>
export default {
	name: "Resizer",
	props: {
		value: {
			type: Number,
			required: true,
		},
		min: {
			type: Number,
			required: true,
		},
		max: {
			type: Number,
			required: true,
		},
		vertical: {
			type: Boolean,
			default: false,
		},
		reverse: {
			type: Boolean,
			default: false,
		},
		nullStart: {
			type: Boolean,
			default: false,
		},
		onlyRuler: {
			type: Boolean,
			default: false,
		},
		spinnerStep: {
			type: Number,
			default: 1
		},
		defer: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			innerValue: null,
			handlerActive: false,
		}
	},
	computed: {
		uid() {
			return this._uid
		},
		model: {
			get() {
				return this.getValInRange(this.innerValue || this.value)
			},
			set(v) {
				const emit = () => this.$emit("input", this.getValInRange(v))
				if (this.defer > 0) {
					this.innerValue = v
					this.$_cf_defer({ id: `resizer_${this.uid}`, timeout: this.defer }, () => {
						this.innerValue = null
						emit()
					})
				} else {
					emit()
				}
			},
		},
		handlerStyles() {
			let { min, max, model } = this
			if (this.nullStart) min = 0
			const diff = max - min
			const roundVal = Math.round(model / 10) * 10
			let percents = (roundVal - min) / diff * 100
			if (this.vertical && this.reverse) percents = 100 - percents

			return {
				"left": `${percents}%`,
			}
		},
		minLimiterClass() {
			return this.getLimiterClass("min")
		},
		maxLimiterClass() {
			return this.getLimiterClass("max")
		},
		equalValues() {
			return this.min === this.max
		},
	},
	mounted() {
		document.body.addEventListener("mousemove", this.handlerMove)
		// событие mouseup обязательно должно висеть на документе
		document.addEventListener("mouseup", this.handlerUp)
	},
	destroyed() {
		if (process.browser) {
			document.body.removeEventListener("mousemove", this.handlerMove)
			document.removeEventListener("mouseup", this.handlerUp)
		}
	},
	methods: {
		getValInRange(v) {
			return Math.min(Math.max((v || 0), this.min), this.max)
		},
		handlerMove(e) {
			if (this.handlerActive) {
				this.scaleMouseHandler(e)
			}
		},
		handlerUp() {
			this.handlerActive = false
		},
		getLimiterClass(id) {
			const type = [
				{
					key: "v",
					cond: this.vertical,
				},
				{
					key: "r",
					cond: this.reverse,
				},
			].filter(({ cond }) => cond).map(({ key }) => key).join("-")
			return [`resizer__limiter_transform_${type}-${id}`]
		},
		scaleMDown(e) {
			this.scaleMouseHandler(e)
			this.handlerActive = true
		},
		scaleMouseHandler({ pageX, pageY }) {
			const { handler, scale } = this.$refs
			if (handler && scale) {
				// px
				const offsetPx = (this.vertical ? -1 : 1) * ((this.vertical ? pageY : pageX) - this.$_cf_offset(handler)[this.vertical ? "top" : "left"])
				const { [this.vertical ? "height" : "width"]: size } = scale.getBoundingClientRect()
				const offsetP = offsetPx / size
				// scalar
				const scalarWidth = this.max - this.min
				const scalarOffset = Math.round(scalarWidth * offsetP / 10) * 10
				if (Math.abs(scalarOffset) >= 10) {
					this.model += scalarOffset
				}
			}
		},
		$_cf_offset(selector) {
			const ret = {
				left: 0,
				top: 0,
			}

			if (process.browser) {
				const bodyRect = document.body.getBoundingClientRect()

				let elRect
				if (typeof selector === "string" && selector) {
					elRect = document.querySelector(selector).getBoundingClientRect()
				} else if (typeof selector === "object" && selector instanceof Element) {
					elRect = selector.getBoundingClientRect()
				}

				if (elRect) {
					ret.left = elRect.left - bodyRect.left
					ret.top = elRect.top - bodyRect.top
				}
			}

			return ret
		},
	},
}
</script>

<style lang="scss" scoped>
.resizer {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 40px;

	&__scale {
		position: relative;
		width: calc(100% - 40px);
		height: 20px;
		background: url("img/scale.svg") repeat-x left top;
		cursor: pointer;
		margin-top: 18px;
	}

	&__handler {
		position: absolute;
		top: -5px;
		transform: translate(-50%, 50%);
		z-index: 1;
		cursor: pointer;
	}

	&__limiter {
		position: absolute;
		top: -16px;
		font-size: 10px;
		line-height: 14px;
		color: #5c6270;

		&_type {
			&_min {
				left: 0;
				//transform: translateX(calc(-100% - 5px));
			}

			&_max {
				right: 0;
				text-align: right;
				//transform: translateX(calc(100% + 5px));
			}
		}

		&_transform {
			&_v-r-min {
				left: auto;
				right: -10px;
				transform: rotate(-90deg);
				transform-origin: top right;
			}

			&_v-min {
				left: -10px;
				right: auto;
				transform: rotate(90deg);
				transform-origin: top left;
			}

			&_v-r-max {
				left: -10px;
				right: auto;
				transform: rotate(-90deg) translateX(-50%);
				transform-origin: bottom left;
			}

			&_v-max {
				left: auto;
				right: -10px;
				transform: rotate(90deg) translateX(50%);
				transform-origin: bottom right;
			}
		}
	}

	&__spinner-cntr {
		width: 126px;
		height: 32px;

		&_rotate {
			transform: rotate(-180deg);
		}

		&_hidden {
			opacity: 0;
		}
	}
}

.handler {
	width: 15px;
	height: 24px;

	&__img {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		background: url("./img/handler.svg") no-repeat center / 100%;
		z-index: 2;
	}

	&__shadow {
		display: block;
		position: absolute;
		left: 13px;
		top: 11px;
		transform: skew(-10deg, 40deg);
		width: 0;
		height: 0;
		box-shadow: 0 0 2px 4px #3a3e46;
		filter: blur(2px);
		z-index: 1;
	}
}
</style>