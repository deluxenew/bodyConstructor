<template lang="pug">
	div.inner-page
		div.page
			div.title Кухни по индивидуальным размерам
			div.constructor
				div.column.preview
					canvas3d(
						v-bind="canvas3DBind"
						ref="canvas"
						@getBoxName="selectedBoxName = $event"
						@selectBox="selectBox"
						@selectTableTop="selectTableTop"
						@removeTableTops="removeAllTableTops"
						@setOrderList="setOrderList"
					)
				div.column.config
					select-case(
						v-model="selectedBoxName"
						:options="bodyOptions"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						:selectedBoxType="selectedBoxType"
						@selectItem="selectCaseConfig"
						@remove="removeCase"
						@selectType="setControlsVerticalPosition"
						@discardSelectBox="discardSelectBox"
					)
					select-table-top(
						v-model="tableTopConfig"
						:options="tableTopOptions"
						:textures="tableTopTextures"
						:elementVariants="tableTops"
						:selectedBox="selectedBox"
						:selectedTableTop="selectedTableTop"
						@remove="removeAllTableTops"
						@selectColor="selectTableTopConfig"
					)
			//    select-facade(
			//      v-model="kitchen.currentConfig.facadeConfig"
			//      :parentVariants="parentVariants"
			//      :elementVariants="facades"
			//      @remove="$refs.kitchen.removeCase()"
			//      @selectItem="selectFacadeConfig"
			//      @selectColor="selectFacadeColor"
			//      @selectChildConfig="selectChildConfig"
			//    )

			calculate-order(
			  :orderList="orderList"
			)
</template>

<script>
import Canvas3d from "./Canvas3d"
import boxes from "./configs/boxes/BoxesList"
import facades from "./FacadesListConfig"
import tableTops from "./configs/TableTop"

import Module from "./module"
import SelectCase from "./SelectCase.vue"
// import SelectFacade from './SelectFacade.vue'
import SelectTableTop from "./SelectTableTop.vue"
import CalculateOrder from "./CalculateOrder"

export default {
	name: "ViewModule3D",
	components: {
		Canvas3d,
		CalculateOrder,
		Module,
		SelectCase,
		// SelectFacade,
		SelectTableTop,
	},
	data() {
		return {
			// common
			config: null,
			controlsVerticalPosition: "bottom",
			caseModelCode: null,

			// from scene
			selectedBox: null,
			selectedBoxName: null,
			selectedBoxType: null,

			// caseConfig: null,
			// facadeConfig: null,
			tableTopConfig: null,
			selectedTableTop: null,
			orderList: null
		}
	},
	computed: {
		canvas3DBind() {
			return {
				controlsVerticalPosition: this.controlsVerticalPosition,
				caseModelCode: this.caseModelCode,
				tableTopConfig: this.tableTopConfig,
			}
		},
		bodyOptions() {
			return this.config && this.config.body.options || null
		},
		tableTopOptions() {
			return this.config && this.config.tabletop.options || null
		},
		tableTopTextures() {
			return this.config && this.config.tabletop.imgLayers[0].images || null
		},
		boxes() {
			const { cases } = boxes
			return cases
		},
		// parentVariants() {
		//   const variants = this.caseConfig?.userData?.variants
		//   const parentId = this.caseConfig?.userData?.parent?.id
		//
		//   if (variants && variants.length) {
		//     let result = []
		//     variants.forEach((el) => {
		//       const fn = boxes[el.id]
		//       result.push(fn)
		//     })
		//     return result
		//   }
		//
		//   if (parentId) {
		//     let result = []
		//     const parent =  boxes[parentId]
		//
		//     if (parent) {
		//       const parentVariants = parent.userData.variants
		//
		//       parentVariants.forEach((el) => {
		//         const fn = boxes[el.id]
		//         result.push(fn)
		//       })
		//       return result
		//     }
		//   }
		//
		//   return []
		// },
		// facades() {
		//   const { colors } = facades
		//
		//   return colors
		// },
		tableTops() {
			const { colors } = tableTops
			return colors
		},
	},
	async mounted() {
		const response = await fetch("/kitchen.json")

		if (response.ok) {
			this.config = await response.json()
		} else {
			alert(`Ошибка HTTP: ${response.status}`)
		}
	},
	methods: {
		discardSelectBox() {
			this.$refs.canvas.clearSelect()
		},
		setControlsVerticalPosition(v) {
			this.controlsVerticalPosition = v
		},
		setOrderList(list) {
			this.orderList = list
		},
		// removeItem({uuid, type}) {
		//   this.$refs.cancas.removeItem({uuid, type})
		//   const idx = this.kitchen.order[type].findIndex((el) => el.uuid === uuid)
		//   if (idx > -1) this.kitchen.order[type].splice(idx, 1)
		// },
		// selectChildConfig({config, color}) {
		//   const {id, type, typeName, url, name, variantType, variantTypeName } = color
		//
		//   const { userData: {doorWidth, doorHeight} } = config
		//
		//   const group = config.children.find(({name}) => name === 'group')
		//   const doors = group.children.filter(({name}) => name === 'leftDoor' || name === 'rightDoor')
		//
		//   doors.forEach((el) => {
		//     el.children[0].add(facades[type](id, doorWidth, doorHeight, url))
		//   })
		//
		//   this.caseConfig = config
		//
		//   this.caseConfig.userData.facadeCount = doors.length
		//   this.caseConfig.userData.facadeColorName = name
		//   this.caseConfig.userData.facadeColorId = id
		//   this.caseConfig.userData.facadeType = type
		//   this.caseConfig.userData.facadeTypeName = typeName
		//   this.caseConfig.userData.facadeVariantType = variantType
		//   this.caseConfig.userData.facadeVariantTypeName = variantTypeName
		//
		//   this.kitchen.currentConfig.facadeConfig.name = config && config.userData && config.userData.parent ? config.name : ''
		// },
		selectCaseConfig(v) {
			this.caseModelCode = v
		},
		selectBox(v) {
			if (v) this.selectedBoxType = v.userData.pos
			if (v) this.caseModelCode = v.userData.code
			this.selectedBox = v
		},
		selectTableTop(v) {
			this.selectedTableTop = v
		},
		// selectFacadeConfig(v) {
		//   // this.facadeConfig = v
		// },
		// selectFacadeColor(color) {
		//   const { id, type, typeName, url, name, variantType, variantTypeName } = color
		//   const { userData: { doorWidth, doorHeight } } = this.caseConfig
		//
		//   const group = this.caseConfig.children.find(({name}) => name === 'group')
		//   const doors = group.children.filter(({name}) => name === 'leftDoor' || name === 'rightDoor')
		//
		//   doors.forEach((el) => {
		//     el.children[0].add(facades[type](id, doorWidth, doorHeight, url))
		//   })
		//
		//   const temp = this.caseConfig.clone()
		//   this.caseConfig = temp
		//
		//   this.caseConfig.userData.facadeCount = doors.length
		//   this.caseConfig.userData.facadeColorName = name
		//   this.caseConfig.userData.facadeColorId = id
		//   this.caseConfig.userData.facadeType = type
		//   this.caseConfig.userData.facadeTypeName = typeName
		//   this.caseConfig.userData.facadeVariantType = variantType
		//   this.caseConfig.userData.facadeVariantTypeName = variantTypeName
		// },
		async selectTableTopConfig(item) {
			function getImage(url) {
				return new Promise((resolve, reject) => {
					const img = new Image()
					img.onload = function() {
						resolve(url)
					}
					img.onerror = function() {
						reject(url)
					}
					img.src = url
				})
			}

			const {
				color, type, maxWidth, minWidth, url, height,
				materialType, colorTitle
			} = item

			const loadedUrl = await getImage(url)

			this.tableTopConfig = {}
			this.tableTopConfig.type = type
			this.tableTopConfig.height = height
			this.tableTopConfig.color = color
			this.tableTopConfig.url = loadedUrl
			this.tableTopConfig.maxWidth = maxWidth
			this.tableTopConfig.minWidth = minWidth
			this.tableTopConfig.materialType = materialType
			this.tableTopConfig.colorTitle = colorTitle
		},
		removeCase() {
			this.$refs.canvas.removeCase(false)
		},
		removeAllTableTops() {
			this.$refs.canvas.removeAllTableTops()
			this.tableTopConfig = null
		}
	},
}
</script>

<style lang="scss">

.column {
	display: flex;
	flex-direction: column;

}

.constructor {
	padding-top: 24px;
	padding-bottom: 24px;
}

.preview {
	width: 800px;
}

.config {
	width: 368px;
	margin-left: 32px;
}

.page {
	width: 1200px;
	margin: 0 auto;

	.title {
		font-weight: bold;
		font-size: 32px;
		line-height: 48px;
		letter-spacing: 0.4px;
		color: #23252A;
	}

	.constructor {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}
}
</style>
