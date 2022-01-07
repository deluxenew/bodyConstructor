<template>
  <transition
    ref="slot"
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
export default {

	name: "TransitionExpand",
	//        props:["expand"],
	methods: {
		afterEnter(element) {
			// eslint-disable-next-line no-param-reassign
			element.style.height = "auto"
			this.$emit("endHeight", this.$parent.$el.clientHeight)
		},
		enter(element) {
			const { width } = getComputedStyle(element)
			/* eslint-disable no-param-reassign */
			element.style.width = width
			element.style.position = "absolute"
			element.style.visibility = "hidden"
			element.style.height = "auto"
			/* eslint-enable */
			const { height } = getComputedStyle(element)
			/* eslint-disable no-param-reassign */
			element.style.width = null
			element.style.position = null
			element.style.visibility = null
			element.style.height = 0
			/* eslint-enable */
			// Force repaint to make sure the
			// animation is triggered correctly.
			// eslint-disable-next-line no-unused-expressions
			getComputedStyle(element).height
			requestAnimationFrame(() => {
				// eslint-disable-next-line no-param-reassign
				element.style.height = height
			})

			this.$emit("finalHeight", this.$parent.$el.clientHeight + parseInt(height.split("px").shift()))
		},
		leave(element) {
			const { height } = getComputedStyle(element)
			// eslint-disable-next-line no-param-reassign
			element.style.height = height
			// Force repaint to make sure the
			// animation is triggered correctly.
			// eslint-disable-next-line no-unused-expressions
			getComputedStyle(element).height
			requestAnimationFrame(() => {
				// eslint-disable-next-line no-param-reassign
				element.style.height = 0
			})

			this.$emit("finalHeight", this.$parent.$el.clientHeight - parseInt(height.split("px").shift()))
		},
	},
	render(createElement, context) {
		const data = {
			props: {
				name: "expand",
			},
			on: {},
		}
		return createElement("transition", data, context.children)
	},
}
</script>

<style scoped>
    * {
        will-change: height;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
    }
</style>

<style>
    .expand-enter-active,
    .expand-leave-active {
        transition: height 0.3s ease-in-out;
        overflow: hidden;
    }

    .expand-enter,
    .expand-leave-to {
        height: 0;
    }
</style>
