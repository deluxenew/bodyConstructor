<template lang="pug">
 div.message

</template>

<script>
export default {
	name: "MessageBox",
	props: {
		message: {
			type: String,
			default: "",
		},
		messageType: {
			type: String,
			default: "warn",
		},
	},
}
</script>

<style  lang="scss" scoped>
.message {
  display: block;
  padding: 16px;
}
</style>
