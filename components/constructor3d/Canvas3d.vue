<template lang="pug">
	div
		div.canvas(ref="canvas")
			div.controls
				div.button.camera(@click="swapCam")
					img(:src="require('./img/eye.svg')")
					div.camera__variants
						div.item(v-for="item in 3")
							svg(width="7" height="4" viewBox="0 0 7 4" fill="none")
								path(d="M0 2C0 0.895431 0.89543 0 2 0H4.66667C5.77124 0 6.66667 0.895431 6.66667 2C6.66667 3.10457 5.77124 4 4.66667 4H2C0.895429 4 0 3.10457 0 2Z" :fill="item <= positionNumber ? '#5C6270' : '#E3E5E8'")
				div.box-control(:class="{active: selectedUuid}")
					button.button.left(:disabled="!selectedUuid || !isMoveLeftActive" @click="moveLeft")
						img(:src="require('./img/arrow.svg')")
					button.button.right(:disabled="!selectedUuid || !isMoveRightActive" @click="moveRight")
						img(:src="require('./img/arrow.svg')")
					button.button.open(:disabled="!selectedUuid || !facades" @click="openDoors")
						img(:src="require('./img/doors.svg')")
					button.button.remove(:disabled="!selectedUuid" @click="removeCase(false)")
						img(:src="require('./img/trash.svg')")
				//div.box-control.tabletop(v-if="selectedTableTop")
				//	//button.button(:disabled="!selectedTableTop" @click="changeTableTopSize")
				//	//	img(:src="require('./img/add.svg')")
				//	ui-button.size(:class="{active: isShowSizes}" size="small" appearance="secondary" @click="" text="Редактировать")
				//	button.button(:disabled="!selectedTableTop" @click="removeTableTop()")
				//		img(:src="require('./img/trash.svg')")
				//div.box-control.sizes
				//	button.button.size(:class="{active: isShowSizes}" @click="showSizes")
				//		svg( width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg")
				//			path(d="M28.0001 10.6034C27.7991 11.1093 27.4252 11.2788 26.8872 11.2781C18.3108 11.2679 9.73375 11.2651 1.15738 11.2802C0.324765 11.2815 0.0362889 10.7887 0.041074 10.1755C0.0608983 7.40146 0.0492772 4.62675 0.0499608 1.85205C0.0499608 1.11377 0.374668 0.789058 1.11705 0.789058C9.72076 0.788375 18.3245 0.790425 26.9289 0.784273C27.458 0.783589 27.8203 0.979097 28.0007 1.48427C28.0001 4.5249 28.0001 7.56416 28.0001 10.6034ZM1.80543 9.50214C9.96686 9.50214 18.1023 9.50214 26.2357 9.50214C26.2357 7.17451 26.2357 4.86806 26.2357 2.55957C25.3607 2.55957 24.5035 2.55957 23.6223 2.55957C23.6223 4.0163 23.6223 5.4498 23.6223 6.89013C23.0372 6.89013 22.4766 6.89013 21.8819 6.89013C21.8819 5.43818 21.8819 3.99785 21.8819 2.55205C20.996 2.55205 20.1456 2.55205 19.261 2.55205C19.261 3.425 19.261 4.28291 19.261 5.14082C18.667 5.14082 18.1064 5.14082 17.511 5.14082C17.511 4.26923 17.511 3.41201 17.511 2.55341C16.6251 2.55341 15.774 2.55341 14.8894 2.55341C14.8894 4.01015 14.8894 5.45048 14.8894 6.88603C14.2954 6.88603 13.7355 6.88603 13.151 6.88603C13.151 5.43613 13.151 4.00263 13.151 2.55546C12.2685 2.55546 11.4099 2.55546 10.5281 2.55546C10.5281 3.425 10.5281 4.27675 10.5281 5.13671C9.93746 5.13671 9.37145 5.13671 8.78014 5.13671C8.78014 4.26718 8.78014 3.41611 8.78014 2.55683C7.89693 2.55683 7.03834 2.55683 6.15719 2.55683C6.15719 4.01084 6.15719 5.44501 6.15719 6.88193C5.56725 6.88193 5.00055 6.88193 4.40924 6.88193C4.40924 5.42793 4.40924 3.99511 4.40924 2.55957C3.52604 2.55957 2.66881 2.55957 1.80611 2.55957C1.80543 4.88242 1.80543 7.18271 1.80543 9.50214Z" fill="none")
				//			path(d="M28 20.4661C27.8373 20.6801 27.6958 20.9153 27.5085 21.1053C26.2158 22.4116 24.9129 23.7077 23.6147 25.0086C23.5443 25.079 23.4883 25.1638 23.4466 25.2151C23.0173 24.7851 22.616 24.3831 22.1963 23.9634C23.0952 23.0638 24.0304 22.1286 25.0038 21.1545C17.6688 21.1545 10.3906 21.1545 3.08778 21.1545C4.04413 22.1006 4.98817 23.0344 5.91717 23.9525C5.46258 24.4105 5.06747 24.809 4.65663 25.2226C4.60262 25.1734 4.53563 25.1166 4.47342 25.0551C3.13495 23.718 1.79647 22.3802 0.45868 21.0417C-0.0929805 20.4901 -0.0929806 20.0505 0.456629 19.5002C1.80057 18.1556 3.1452 16.811 4.48846 15.465C4.53973 15.4137 4.57665 15.3488 4.59921 15.3187C5.02645 15.7466 5.42772 16.1486 5.84676 16.569C4.95741 17.4576 4.02225 18.3921 3.0454 19.3676C10.3845 19.3676 17.6613 19.3676 24.9512 19.3676C24.0016 18.4256 23.0624 17.4939 22.1375 16.5765C22.5887 16.1246 22.9913 15.7206 23.4329 15.2784C23.5067 15.3679 23.5847 15.4814 23.6797 15.5764C24.932 16.8328 26.1898 18.0838 27.4388 19.3444C27.6459 19.5529 27.8134 19.8003 27.9993 20.03C28 20.1749 28 20.3205 28 20.4661Z" fill="none")
				table-top-resizer(
					v-if="selectedTableTop"
					:currentTableTop="selectedTableTop"
					:tableTopConfig="tableTopConfig"
					:maxWidth="maxWidthTableTop"
					@cancelResize="cancelResize"
					@replaceTableTop="replaceTableTop"
					@removeTableTop="removeTableTop"
				)


</template>

<script>

import * as THREE from "three"
import {
	AnimationClip, AnimationMixer, VectorKeyframeTrack
} from "three"
import StartLoader from "./configs/Init"
import HF from "./HelperFunctions"

import * as boxes from "./configs/boxes/BoxesList"

import { getTableTop } from "./configs/TableTop"
import TableTopResizer from "./TableTopResizer"
import { UiButton } from "@aksonorg/design"

import Materials from "./configs/Materials"

const { textureMappedMaterial } = Materials

const {
	scene, renderer, spotLights, camera, walls, controlBoxes,
} = StartLoader
const { fromTo, camPos, camToTableTop, getImage } = HF

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const MAX_PLACE_WIDTH = 50

export default {
	name: "Canvas3d",
	components: { TableTopResizer, UiButton },
	props: {
		controlsVerticalPosition: {
			type: String,
			default: "floor",
		},
		caseModelCode: {
			type: String,
			default: "",
		},
		facadeConfig: {
			type: Object,
			default: () => null,
		},
		tableTopConfig: {
			type: Object,
			default: () => null,
		},
	},
	data() {
		return {
			renderer: renderer(CANVAS_WIDTH, CANVAS_HEIGHT),
			scene: scene(),
			camera: camera(CANVAS_WIDTH, CANVAS_HEIGHT),
			positionNumber: 1,
			selectedTableTop: null,
			mixer: null,
			clock: new THREE.Clock(),
			animations: [],
			isShowSizes: true,
			selectedUuid: null,
		}
	},
	computed: {
		facades() {
			if (this.selectedBox) {
				const facades = HF.getFacadeGroup(this.selectedBox)
				return !!facades
			}
			return false
		},
		maxWidthTableTop() {
			if (!this.sceneObjects.tableTop) return 0
			const materialMaxWidth = this.tableTopConfig && this.tableTopConfig.maxWidth || 0
			const {
				userData: {
					commonIndex: tableTopCommonIndex,
					index: tableTopIndex,
					width: tableTopWidth,
					locked: tableTopLocked,
					pos: TableTopPos,
					difference: tableTopDifference,
					leftDifference: tableTopLeftDifference
				}
			} = this.selectedTableTop
			let TableTopTotalWidth = this.sceneObjects.tableTop.reduce((acc, {
				userData: {
					commonIndex,
					width,
					index,
					difference,
					pos,
				}
			}) => {
				if (tableTopCommonIndex === commonIndex && pos === TableTopPos) {
					if (index === 0) {
						if (tableTopIndex === 0) {
							acc += tableTopWidth
							if (difference) acc += difference
						}
					}
					if (index === 1 && tableTopIndex === 1) {
						acc += width
						if (tableTopDifference) acc += tableTopDifference
						if (tableTopLeftDifference) acc += tableTopLeftDifference
					}
				}
				return acc
			}, 0)
			const additional = materialMaxWidth / 100 - TableTopTotalWidth
			if (!tableTopLocked) TableTopTotalWidth += additional
			return TableTopTotalWidth * 100
		},
		isMoveLeftActive() {
			return this.isMoveButtonActive(true)
		},
		isMoveRightActive() {
			return this.isMoveButtonActive(false)
		},
		sceneObjects() {
			const result = this.scene.children.reduce((acc, el) => {
				const {
					userData: {
						type, pos, side, sort, width, noTableTop, configType,
					}, position: { x, z },
				} = el

				if (el.children) {
					const text = el.children.filter(({ name }) => name === "text")
					const arrows = el.children.filter(({ name }) => name === "arrows")
					if (!acc["sizes"]) acc["sizes"] = []
					if (text) text.forEach((el) => acc.sizes.push(el))
					if (arrows) arrows.forEach((el) => acc.sizes.push(el))
				}

				if (pos && type !== "control") {
					if (!acc[pos]) acc[pos] = []
					acc[pos].push(el)
				}
				if (pos === "floor" && type !== "control") {
					const field = `${side}TableTop`
					if (!acc[field]) acc[field] = []
					const angularTableWidth = configType === "angularBox" ? width + 2 : width
					const tableWidth = noTableTop ? 0 : angularTableWidth
					const tableX = configType === "angularBox" ? (side === "left" ? x + 1 : x) : x
					const tableZ = configType === "angularBox" ? (side === "left" ? z : z - 1) : z
					acc[field].push({
						side, width: tableWidth, sort, x: tableX, z: tableZ, configType
					})
				}
				if (type) {
					if (!acc[type]) acc[type] = []
					acc[type].push(el)
					if (el.userData.facadeConfig && el.userData.facadeQuantity) {
						if (!acc["facades"]) acc["facades"] = []
						acc["facades"].push({
							...el.userData.facadeConfig,
							quantity: el.userData.facadeQuantity
						})
					}
				}
				return acc
			}, {})

			result.length = this.scene.children.length
			return result
		},
		orderList() {
			let kitchen = {}
			for (let i in this.sceneObjects) {
				const cases = ["bottomRight", "bottomLeft", "topRight", "topLeft"]
				if (i === "tableTop") {
					kitchen["tableTops"] = this.sceneObjects[i]
						.map(({ userData }) => HF.setOrderFields(userData))
				}
				if (i === "facades") {
					kitchen["facades"] = this.sceneObjects[i]
						.map(({ facadeVariant, materialTitle, materialTypeTitle, colorTitle, quantity }) => {
							const sizeSplit = facadeVariant.split("_")
							const size = `${sizeSplit[0]}x${sizeSplit[0]} мм`
							return HF.setOrderFields({
								size,
								materialType: materialTitle,
								productType: materialTypeTitle,
								color: colorTitle,
								quantity,
							})
						})
				}
				if (cases.includes(i)) {
					this.sceneObjects[i]
						.map(({ userData }) => HF.setOrderFields(userData))
						.forEach((el) => {
							if (!kitchen["cases"]) kitchen["cases"] = []
							kitchen["cases"].push(el)
						})
				}
			}
			return kitchen
		},
		widthLeftBottom() {
			return HF.getPlaceWidth({
				arr: !!this.sceneObjects.bottomLeft && this.sceneObjects.bottomLeft.map(({ userData }) => userData),
				additionalArr: !!this.sceneObjects.bottomRight && this.sceneObjects.bottomRight.map(({ userData }) => userData),
				penalBoxes: null,
				modelWidth: null
			})
		},
		widthRightBottom() {
			return HF.getPlaceWidth({
				arr: !!this.sceneObjects.bottomRight && this.sceneObjects.bottomRight.map(({ userData }) => userData),
				additionalArr: !!this.sceneObjects.bottomLeft && this.sceneObjects.bottomLeft.map(({ userData }) => userData),
				penalBoxes: null,
				modelWidth: null
			})
		},
		widthLeftTop() {
			const penalBoxes = this.sceneObjects.bottomLeft && this.sceneObjects.bottomLeft
				.filter(({ userData: { configType } }) => configType === "penalBox")
			return HF.getPlaceWidth({
				arr: !!this.sceneObjects.topLeft && this.sceneObjects.topLeft.map(({ userData }) => userData),
				additionalArr: !!this.sceneObjects.topRight && this.sceneObjects.topRight.map(({ userData }) => userData),
				penalBoxes,
				modelWidth: this.modelWidth
			})
		},
		widthRightTop() {
			const penalBoxes = this.sceneObjects.bottomRight && this.sceneObjects.bottomRight
				.filter(({ userData: { configType } }) => configType === "penalBox")
			return HF.getPlaceWidth({
				arr: !!this.sceneObjects.topRight && this.sceneObjects.topRight.map(({ userData }) => userData),
				additionalArr: !!this.sceneObjects.topLeft && this.sceneObjects.topLeft.map(({ userData }) => userData),
				penalBoxes,
				modelWidth: this.modelWidth
			})
		},
		camPosition() {
			if (!this.selectedTableTop) {
				return camPos(this.positionNumber, this.widthRightBottom, this.widthLeftBottom, this.widthRightTop, this.widthLeftTop)
			} else {
				return camToTableTop(this.selectedTableTop)
			}
		},
		modelWidth() {
			return 10
		},
		selectedBox() {
			if (!this.selectedUuid) return null
			return this.scene.children.find(({ uuid }) => uuid === this.selectedUuid)
		},
		caseModel() {
			const facadeName = this.facadeConfig ? this.facadeConfig.facadeVariant : null
			// if (this.selectedBox) {
			// 	return boxes[this.selectedBox.userData.code.replaceAll("-", "")](facadeName)
			// }
			const isAngular = this.caseModelCode === "f-800a" && this.controlsVerticalPosition === "floor"

			const caseModelCodeFormatted = this.caseModelCode && this.caseModelCode.replaceAll("-", "") || ""

			if (caseModelCodeFormatted) {
				if (facadeName) return boxes[caseModelCodeFormatted](facadeName)
				return boxes[caseModelCodeFormatted]()
			}
		},
	},
	watch: {
		selectedBox(v) {
			this.$emit("selectBox", v)
			this.setControlsPosition()
		},
		selectedTableTop(v) {
			this.$emit("selectTableTop", v)
		},
		tableTopConfig() {
			this.replaceTableTops()
		},
		"controlsVerticalPosition": {
			immediate: true,
			async handler() {
				await this.$nextTick()
				this.setControlsVisible()
				this.setControlsPosition()
			},
		},
		"sceneObjects.floor.length": async function() {
			if (!this.tableTopConfig) return
			await this.$nextTick()
			this.replaceTableTops()
		},
		"sceneObjects.length": async function() {
			await HF.setCasesPosition(this.scene.children)
			this.setControlsVisible()
			this.setControlsPosition()
			this.$emit("setOrderList", this.orderList)
		},
		async facadeConfig(v) {
			if (this.selectedBox && v) {
				const stringBox = JSON.stringify(this.selectedBox.userData.facadeConfig)
				const stringConfig = JSON.stringify(v)
				if (stringBox === stringConfig) return
				await this.$nextTick()
				await this.replaceFacade(this.facadeConfig)
			}
			if (!v && this.selectedBox) this.removeFacade()
			this.$emit("setOrderList", this.orderList)
		},
		async caseModelCode(v) {
			await this.$nextTick()
			this.setControlsVisible()
			if (this.selectedBox && this.selectedBox.userData.code !== v && this.selectedBox.userData.pos === this.controlsVerticalPosition) {
				const { userData: { sort, type } } = this.selectedBox
				await this.replaceBox(sort, type)
				HF.setCasesPosition(this.scene.children)
			}
			this.setControlsPosition()
		},
		isShowSizes(v) {
			this.sceneObjects.sizes.forEach((el) => el.visible = v)
		},
	},
	mounted() {
		const vm = this

		this.init()
		/*
    const arr = [
      { box: boxes["f_400"], pos: "floor", side: 'left', type: 'boxFloor', sort: '0' },
      //{ code: "f_800", method: "addBottomRightToScene" }
      ]
    arr.forEach((item) => {
      vm.selectedBox = item.box
      vm.selectedBox.userData.sort = item.sort
      vm.selectedBox.userData.type = item.type
      vm.addBottomLeftToScene(item.sort)
      //vm[item.method]()
    });
    */

		// animationFromTo(vm.scene)
		function render() {
			const steps = 13
			requestAnimationFrame(render)

			vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, vm.camPosition.sceneRotationY, steps)
			vm.scene.position.x = fromTo(vm.scene.position.x, vm.scene.position.x, vm.camPosition.scenePositionX, steps)
			vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, vm.camPosition.cameraPositionX, steps)
			vm.camera.position.z = fromTo(vm.camera.position.z, vm.camera.position.z, vm.camPosition.cameraPositionZ, steps)
			vm.camera.rotation.x = fromTo(vm.camera.rotation.x, vm.camera.rotation.x, vm.camPosition.cameraRotationX, steps)
			vm.camera.position.y = fromTo(vm.camera.position.y, vm.camera.position.y, vm.camPosition.cameraPositionY, steps)

			vm.renderer.render(vm.scene, vm.camera)

			const delta = vm.clock.getDelta()
			if (vm.animations.length) {
				vm.animations.forEach((el) => {
					el.mixer.update(delta)
				})
			}
		}

		render()
	},
	methods: {
		init() {
			walls.forEach((wall) => this.scene.add(wall))
			spotLights.forEach((spotLight) => this.scene.add(spotLight))
			controlBoxes.forEach((control) => this.scene.add(control))
			this.$refs.canvas.appendChild(this.renderer.domElement)
			this.selectCase()
		},

		clearSelect() {
			this.selectedUuid = null
			const vm = this

			function clearHelpers() {
				vm.scene.children.forEach((el) => {
					const edges = el.children.find(({ name }) => name === "edges")
					// const transparent = el.children.find(({ name }) => name === "transparent")
					if (edges) {
						edges.visible = false
						// transparent.visible = false
					}
				})
			}

			clearHelpers()
		},
		async replaceBox(sort, type) {
			if (!this.selectedBox) return
			const arrAddMethods = ["addBottomLeftToScene", "addBottomRightToScene", "addTopLeftToScene", "addTopRightToScene"]
			const addMethod = HF.getAddMethodName(arrAddMethods, type)
			this.removeCase(true)
			this[addMethod](sort)
			if (!this.tableTopConfig) return
			this.replaceTableTops()
		},
		async replaceFacade(config) {
			await this.$nextTick()
			if (!this.selectedBox) return

			const { caseModelCode, materialCode, facadeVariant, colorUrls, textureMap } = config
			const facade = this.selectedBox.children.find(({ name }) => name === "facade")
			if (!colorUrls || !materialCode || !facadeVariant || !caseModelCode) return
			const drawers = HF.getDrawerGroup(this.selectedBox)
			if (drawers && this.selectedBox.userData.openedDoors) {
				this.animations = []
				drawers.forEach((el) => {
					const { userData: { posY } } = el
					el.position.set(0, posY, 0)
				})
				this.selectedBox.userData.openedDoors = false
			}
			if (!facade) {
				const isAngularBox = this.caseModel.userData.configType === "angularBox" && this.caseModel.userData.pos === "floor"

				const newFacadeGroup = boxes[this.selectedBox.userData.code.replaceAll("-", "") + (isAngularBox ? this.selectedBox.userData.side : "")](facadeVariant, true)
				newFacadeGroup.children.forEach((el, index) => {
					const { userData: { facadeWidth, facadeHeight, positionX, positionY } } = el
					const facadeTexture = textureMappedMaterial({
						loadedMap: textureMap,
						loadedTexture: colorUrls[index],
						width: facadeWidth,
						height: facadeHeight,
						sideDepth: 0.16
					})
					if (positionY) facadeTexture.position.y += positionY
					facadeTexture.position.x += positionX
					el.add(facadeTexture)
				})
				if (textureMap) await getImage(textureMap)
				if (colorUrls[0]) await getImage(colorUrls[0])
				await this.$nextTick()
				this.selectedBox.add(newFacadeGroup)
				this.selectedBox.userData.facadeConfig = this.facadeConfig
				this.selectedBox.userData.facadeQuantity = newFacadeGroup.userData.facadeQuantity
			}
			if (facade) {
				const isAngularBox = this.caseModel.userData.configType === "angularBox" && this.caseModel.userData.pos === "floor"
				const newFacadeGroup = boxes[this.selectedBox.userData.code.replaceAll("-", "") + (isAngularBox ? this.selectedBox.userData.side : "")](facadeVariant, true)
				newFacadeGroup.children.forEach((el, index) => {
					const { userData: { facadeWidth, facadeHeight, positionX, positionY } } = el
					const facadeTexture = textureMappedMaterial({
						loadedMap: textureMap,
						loadedTexture: colorUrls[index],
						width: facadeWidth,
						height: facadeHeight,
						sideDepth: 0.16
					})
					if (positionY) facadeTexture.position.y += positionY
					facadeTexture.position.x += positionX
					el.add(facadeTexture)
				})
				if (textureMap) await getImage(textureMap)
				if (colorUrls[0]) await getImage(colorUrls[0])
				if (!this.selectedBox) return
				this.selectedBox.remove(facade)
				this.selectedBox.userData.facadeConfig = null
				this.selectedBox.userData.facadeQuantity = 0

				this.selectedBox.add(newFacadeGroup)
				this.selectedBox.userData.facadeConfig = this.facadeConfig
				this.selectedBox.userData.facadeQuantity = newFacadeGroup.userData.facadeQuantity
			}
		},
		removeFacade() {

		},
		swapCam() {
			if (this.positionNumber < 3) this.positionNumber += 1
			else this.positionNumber = 1
		},
		isMoveButtonActive(isLeft) {
			if (!this.selectedUuid) return false
			const {
				userData: {
					type, sort: selectedSort, side, configType: selectType,
				},
			} = this.selectedBox
			if (!["boxFloor", "penalBox", "boxWall"].includes(selectType)) return false

			const currentType = this.selectedBox.userData.type
			const penalBox = this.sceneObjects[currentType] && this.sceneObjects[currentType].find(({ userData: { configType } }) => configType === "penalBox")
			const disableMoveBox = penalBox && penalBox.userData.sort === 1 && selectType === "boxFloor" && this.selectedBox.userData.sort === 0
			const disableMovePenalBox = selectType === "penalBox" && this.selectedBox.userData.sort < 2
			const findAngularRight = this.sceneObjects.bottomRight && this.sceneObjects.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")
			const findAngularLeft = this.sceneObjects.bottomLeft && this.sceneObjects.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")
			if (findAngularRight && (isLeft && disableMoveBox || disableMovePenalBox) || (findAngularLeft && (isLeft && disableMovePenalBox || disableMoveBox))) {
				return false
			}

			const increment = (side === "left" && isLeft) || (side !== "left" && !isLeft) ? 1 : -1
			const obj = this.sceneObjects[type] && this.sceneObjects[type].find(({ userData: { sort } }) => sort - increment === selectedSort)
			if (!obj) return false
			const { userData: { configType } } = obj
			return obj && ["boxFloor", "penalBox", "boxWall"].includes(configType)
		},
		moveBox(toLeft) {
			if (!this.selectedBox) return
			const { userData: { sort: replaceSort, type } } = this.selectedBox
			const isLeft = type.toLowerCase().indexOf("left") > -1
			const increment = (isLeft && toLeft) || (!isLeft && !toLeft) ? 1 : -1
			const obj = this.sceneObjects[type].find(({ userData: { sort } }) => sort - increment === replaceSort)
			if (obj) {
				obj.userData.sort -= increment
				this.selectedBox.userData.sort += increment
			}
			HF.setCasesPosition(this.scene.children)
			this.setControlsPosition()
			this.replaceTableTops()
		},
		moveLeft() {
			this.moveBox(true)
		},
		moveRight() {
			this.moveBox(false)
		},
		async openDoors() {
			if (this.selectedBox) {
				await this.$nextTick()
				const { userData: { openedDoors }, uuid: boxUuid } = this.selectedBox
				const drawers = HF.getDrawerGroup(this.selectedBox)
				const facades = HF.getFacadeGroup(this.selectedBox)

				// this.animations = this.animations.filter((el) => el.boxUuid !== boxUuid)
				if (!facades) return
				if (drawers) {
					drawers.forEach((el) => {
						const { userData: { posY }, uuid } = el
						const positionOpen = new VectorKeyframeTrack( ".position", [0, 1], [0, posY, 0, 0, posY, 4] )
						const positionClose = new VectorKeyframeTrack( ".position", [0, 1], [0, posY, 4, 0, posY, 0] )

						const anim = openedDoors ? positionClose : positionOpen

						const clip = new AnimationClip("Action", 1, [anim])
						const mixer = new AnimationMixer(el)

						const clipAction = mixer.clipAction(clip)
						clipAction.loop = THREE.LoopOnce
						clipAction.clampWhenFinished = true
						clipAction.play()

						this.selectedBox.userData.openedDoors = !openedDoors

						this.animations.push({
							mixer: mixer,
							uuid,
							boxUuid
						})
					})
				}


				facades.forEach((el) => {
					const { userData: { quaternionOpen, quaternionClose }, uuid } = el
					if (!quaternionOpen || !quaternionClose) return
					const anim = openedDoors ? quaternionClose : quaternionOpen

					const clip = new AnimationClip("Action", 1, [anim])
					const mixer = new AnimationMixer(el)

					const clipAction = mixer.clipAction(clip)
					clipAction.loop = THREE.LoopOnce
					clipAction.clampWhenFinished = true
					clipAction.play()

					this.selectedBox.userData.openedDoors = !openedDoors

					this.animations.push({
						mixer: mixer,
						uuid,
						boxUuid
					})
				})
				if (!drawers && !facades) return
				this.animations.forEach((el) => {
					const findBoxUuid = el.boxUuid
					el.mixer.addEventListener("finished", (e) => {
						const findIdx = this.animations
							.findIndex(({ boxUuid }) => findBoxUuid === boxUuid)
						this.animations.splice(findIdx, 1)
					})
				})
			}
		},
		removeCase(isReplace = false) {
			const selectedObject = this.scene.getObjectByProperty("uuid", this.selectedBox.uuid)
			if (selectedObject) {
				const { userData: { type, sort } } = selectedObject
				this.scene.remove(selectedObject)
				this.selectedUuid = null
				if (isReplace) return

				if (!this.sceneObjects[type]) return
				this.sceneObjects[type].forEach((el) => {
					// console.log(el.userData.sort > sort)
					if (el.userData.sort > sort) el.userData.sort--
				})
				// this.$emit('removeItem', {uuid: selectedObject.uuid, type: 'cases'})
			}
		},
		setControlsVisible() {
			const isAngular = this.caseModel && this.caseModel.userData.configType === "angularBox"
			this.sceneObjects.control.forEach((el) => {
				const { userData: { pos, watcher, position } } = el
				const isExistAngular = this.sceneObjects[pos] && this.sceneObjects[pos].find(({ userData: { configType } }) => configType === "angularBox")
				const noAddAngularMoreOne = isAngular && isExistAngular
				const correctVerticalPosition = pos === this.controlsVerticalPosition
				const noAddBoxToAnotherSide = this.sceneObjects[pos] && !isAngular && !isExistAngular && !this.sceneObjects[position] && correctVerticalPosition
				const exceedingWidth = this[watcher] >= MAX_PLACE_WIDTH
				el.visible = !(noAddAngularMoreOne || !correctVerticalPosition || noAddBoxToAnotherSide || exceedingWidth)
			})
		},
		setControlsPosition() {
			this.sceneObjects.control.forEach((el) => {
				const { userData: { getCoords, watcher }, position: { x, y, z } } = el
				el.position.set(...getCoords(x, y, z, this[watcher]))
			})
		},
		async addBoxToScene(pos, side, sort) {
			await this.$nextTick()
			if (!this.caseModel) return
			const facadeName = this.facadeConfig ? this.facadeConfig.facadeVariant : null
			const isAngularBox = this.caseModel.userData.configType === "angularBox" && this.caseModel.userData.pos === "floor"
			const caseModelCodeFormatted = this.caseModelCode && this.caseModelCode.replaceAll("-", "") || ""

			const box = boxes[caseModelCodeFormatted + (isAngularBox ? side : "")](facadeName)
			const count = this.sceneObjects[pos] ? this.sceneObjects[pos].length : 0
			const isAngular = box.userData.configType === "angularBox"
			if (isAngular && this.sceneObjects[pos]) this.sceneObjects[pos].forEach((el) => el.userData.sort++)
			box.userData.type = pos
			box.userData.side = side
			box.userData.sort = isAngular ? 0 : (sort !== undefined ? sort : count)
			const text = box.children.find(({ name }) => name === "text")
			const arrows = box.children.find(({ name }) => name === "arrows")
			text.visible = true
			arrows.visible = true

			return box
		},
		async addBottomLeftToScene(sort) {
			const newBox = await this.addBoxToScene("bottomLeft", "left", sort)
			const uuid = newBox.uuid
			this.scene.add(newBox)
			await this.addFacadeToBox(uuid)
		},
		async addBottomRightToScene(sort) {
			const newBox = await this.addBoxToScene("bottomRight", "right", sort)
			const uuid = newBox.uuid
			this.scene.add(HF.rotationY(newBox))
			await this.addFacadeToBox(uuid)
		},
		async addTopLeftToScene(sort) {
			const newBox = await this.addBoxToScene("topLeft", "left", sort)
			const uuid = newBox.uuid
			this.scene.add(newBox)
			await this.addFacadeToBox(uuid)
		},
		async addTopRightToScene(sort) {
			const newBox = await this.addBoxToScene("topRight", "right", sort)
			const uuid = newBox.uuid
			this.scene.add(HF.rotationY(newBox))
			await this.addFacadeToBox(uuid)
		},
		async addFacadeToBox(uuid) {
			if (!this.facadeConfig) return
			const box = this.scene.getObjectByProperty("uuid", uuid)
			const { caseModelCode, materialCode, facadeVariant, colorUrls, textureMap } = this.facadeConfig
			if (colorUrls && materialCode && facadeVariant && caseModelCode) {
				const facade = box.children.find(({ name }) => name === "facade")
				if (!colorUrls || !materialCode || !facadeVariant || !caseModelCode) return
				if (facade) {
					const isAngularBox = this.caseModel.userData.configType === "angularBox" && this.caseModel.userData.pos === "floor"
					const newFacadeGroup = boxes[box.userData.code.replaceAll("-", "") + (isAngularBox ? box.userData.side : "")](facadeVariant, true)
					newFacadeGroup.children.forEach((el, index) => {
						const { userData: { facadeWidth, facadeHeight, positionX, positionY } } = el
						const facadeTexture = textureMappedMaterial({
							loadedMap: textureMap,
							loadedTexture: colorUrls[index],
							width: facadeWidth,
							height: facadeHeight,
							sideDepth: 0.16
						})
						if (positionY) facadeTexture.position.y += positionY
						facadeTexture.position.x += positionX
						el.add(facadeTexture)
					})
					if (textureMap) await getImage(textureMap)
					if (colorUrls[0]) await getImage(colorUrls[0])

					box.remove(facade)
					box.userData.facadeConfig = null
					box.userData.facadeQuantity = 0

					box.add(newFacadeGroup)
					box.userData.facadeConfig = this.facadeConfig
					box.userData.facadeQuantity = newFacadeGroup.userData.facadeQuantity
				}
			}
		},
		selectCase() {
			const vm = this
			const mouse = new THREE.Vector2()
			const raycaster = new THREE.Raycaster()

			this.$refs.canvas.addEventListener("pointerdown", onPointerDown)
			this.$refs.canvas.addEventListener("pointermove", onSelectGroup)

			function clearHelpers(clearEdges, clearTransparent) {
				vm.scene.children.forEach((el) => {
					const edges = el.children.find(({ name }) => name === "edges")
					// const transparent = el.children.find(({ name }) => name === "transparent")
					if (edges ) {
						if (el.uuid !== vm.selectedUuid)	if (clearEdges) edges.visible = false
						// if (clearTransparent) transparent.visible = false
					}
				})
			}

			function onSelectGroup(event) {
				if (event.target.className !== "controls") return
				const canvasPos = vm.$refs.canvas.getBoundingClientRect()
				mouse.x = ((event.clientX - canvasPos.x) / CANVAS_WIDTH) * 2 - 1
				mouse.y = -((event.clientY - canvasPos.y) / CANVAS_HEIGHT) * 2 + 1

				raycaster.setFromCamera(mouse, vm.camera)

				const intersects = raycaster.intersectObjects(vm.scene.children, true)

				if (intersects.length > 0) {
					const { object } = intersects[0]
					const obj = HF.recursiveFindBox(object)
					if (obj) {
						 clearHelpers(true, false)
						const edges = obj.children.find(({ name }) => name === "edges")
						edges.visible = true
					}
					if (!obj) {
						clearHelpers(false, false)
					}
				}
			}

			function onPointerDown(event) {
				if (event.target.className !== "controls") return
				const canvasPos = vm.$refs.canvas.getBoundingClientRect()
				mouse.x = ((event.clientX - canvasPos.x) / CANVAS_WIDTH) * 2 - 1
				mouse.y = -((event.clientY - canvasPos.y) / CANVAS_HEIGHT) * 2 + 1

				raycaster.setFromCamera(mouse, vm.camera)

				const intersects = raycaster.intersectObjects(vm.scene.children, true)
				if (intersects.length > 0) {
					const { object } = intersects[0]
					const controlActionName = HF.findActionName(object)

					if (controlActionName) {
						vm[controlActionName]()
					} else {
						const findTableTop = HF.recursiveFindBox(object)
						if (findTableTop && findTableTop.name === "tableTop") {
							clearHelpers(true, true)
							const edges = findTableTop.children.find(({ name }) => name === "edges")
							// const transparent = findTableTop.children.find(({ name }) => name === "transparent")
							edges.visible = true
							// transparent.visible = true
							vm.selectedTableTop = findTableTop
							vm.selectedUuid = null
							return
						}
						const findBox = HF.recursiveFindBox(object)

						vm.selectedTableTop = null

						if (findBox) {
							vm.selectedUuid = findBox.uuid
							clearHelpers(true, true)
							// vm.$emit("getBoxName", vm.selectedBox?.name || null)

							const edges = findBox.children.find(({ name }) => name === "edges")
							// const transparent = findBox.children.find(({ name }) => name === "transparent")

							edges.visible = true
							// transparent.visible = true
						} else {
							vm.clearSelect()
						}
					}
				}
			}
		},

		async addTableTop() {
			if (!this.tableTopConfig) return
			if (this.sceneObjects.leftTableTop) {
				const isRightTableTop = !!this.sceneObjects.rightTableTop
				const isExistAngular = !!this.sceneObjects.bottomLeft && this.sceneObjects.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")
				const leftSorted = this.sceneObjects.leftTableTop
					.sort((a, b) => a.sort - b.sort)

				const leftTableTops = HF.getTableTops(leftSorted, isRightTableTop, this.tableTopConfig.maxWidth, this.tableTopConfig.minWidth)
				await getImage(this.tableTopConfig.url)
				leftTableTops.forEach(({ width, x, z, commonIndex, index, locked }, i) => {
					const needDepthSize = (isExistAngular || !isRightTableTop) && i === 0 && this.isShowSizes
					const newTableTop = this.getTableTopModel(width, needDepthSize, true)
					newTableTop.position.x = x
					newTableTop.position.z = z
					newTableTop.position.y = 8.2 + this.tableTopConfig.height / 2
					newTableTop.userData.pos = "left"
					newTableTop.userData.existDepthSize = needDepthSize
					newTableTop.userData.commonIndex = commonIndex
					newTableTop.userData.index = index
					newTableTop.userData.locked = locked

					this.scene.add(newTableTop)
				})
			}
			if (this.sceneObjects.rightTableTop) {
				const isLeftTableTop = !!this.sceneObjects.leftTableTop
				const isExistAngular = !!this.sceneObjects.bottomRight && this.sceneObjects.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")
				const leftSorted = this.sceneObjects.rightTableTop
					.sort((a, b) => a.sort - b.sort)

				const leftTableTops = HF.getTableTops(leftSorted, isLeftTableTop, this.tableTopConfig.maxWidth, this.tableTopConfig.minWidth)
				await getImage(this.tableTopConfig.url)
				leftTableTops.forEach(({ width, x, z, commonIndex, index, locked }, i) => {
					const needDepthSize = (isExistAngular || !isLeftTableTop) && i === 0 && this.isShowSizes
					const newTableTop = this.getTableTopModel(width, needDepthSize)
					newTableTop.position.x = x
					newTableTop.position.z = z
					newTableTop.position.y = 8.2 + this.tableTopConfig.height / 2
					newTableTop.userData.pos = "right"
					newTableTop.userData.existDepthSize = needDepthSize
					newTableTop.userData.commonIndex = commonIndex
					newTableTop.userData.index = index
					newTableTop.userData.locked = locked
					this.scene.add(HF.rotationY(newTableTop))
				})
			}
		},
		changeTableTopSize() {
			if (!this.selectedTableTop) return
		},
		async removeTableTop(uuid) {
			if (uuid) {
				const selectedTableTop = this.scene.getObjectByProperty("uuid", uuid)
				this.scene.remove(selectedTableTop)
				return
			}
			// const selectedTableTop = this.scene.getObjectByProperty("uuid", this.selectedTableTop.uuid)
			const { userData: { commonIndex, index } } = this.selectedTableTop
			if (index === 1) {
				const editedTableTop = this.sceneObjects.tableTop.find(({ userData: { commonIndex: findCommonIndex } }) => findCommonIndex === commonIndex )
				if (editedTableTop) editedTableTop.userData.locked =false
			}

			this.scene.remove(this.selectedTableTop)
			await this.$nextTick()
			if (!this.sceneObjects.tableTop) this.$emit("removeTableTops")
			this.selectedTableTop = null
		},
		removeAllTableTops() {
			this.replaceTableTops(true)
		},
		getTableTopModel(width, needDepthSize, isLeft) {
			const { url, height, type, maxWidth, minWidth, colorTitle, materialType } = this.tableTopConfig
			const newTableTop = getTableTop({
				width, url, height, type, maxWidth, minWidth
			}, needDepthSize, isLeft)
			newTableTop.userData.size = `${Math.round(width * 100)}*600*${Math.round(height * 100)}`
			newTableTop.userData.materialType = materialType
			newTableTop.userData.color = colorTitle

			return newTableTop
		},
		replaceTableTops(onlyRemove) {
			const tableTops = this.sceneObjects.tableTop
			if (tableTops) {
				tableTops.forEach((el) => el.userData.old = true)
			}
			if (!onlyRemove) this.addTableTop()

			if (tableTops) {
				setTimeout(() => {
					tableTops.forEach((el) => {
						if (el.userData.old) this.scene.remove(el)
					})
				}, 50)
			}
		},
		cancelResize() {
			const edges = this.selectedTableTop.children.find(({ name }) => name === "edges")
			// const transparent = this.selectedTableTop.children.find(({ name }) => name === "transparent")
			if (edges) {
				edges.visible = false
				// transparent.visible = false
			}
			this.selectedTableTop = null
		},
		async replaceTableTop(newTableTop) {
			const { userData: { index, commonIndex, pos, difference } } = newTableTop
			if (difference && index === 0) {
				this.sceneObjects.tableTop.forEach((el) => {
					const {
						userData: {
							index: findIndex,
							commonIndex: findCommonIndex,
							pos: findPos,
							leftDifference: findLeftDifference
						}
					} = el
					if (findCommonIndex === commonIndex && findPos === pos) {
						if (findIndex > index) el.userData.leftDifference = findLeftDifference ? difference + findLeftDifference : difference
					}
				})
			}
			if (difference && index === 1) {
				this.sceneObjects.tableTop.forEach((el) => {
					const { userData: { index: findIndex, commonIndex: findCommonIndex, pos: findPos } } = el
					if (findCommonIndex === commonIndex && findPos === pos) {
						if (findIndex === 0) el.userData.difference = 0
					}
				})
			}


			this.scene.add(newTableTop)
			await this.$nextTick()
			this.scene.remove(this.selectedTableTop)

			this.selectedTableTop = this.scene.children
				.find(({
								 userData: {
									 index: findIndex,
									 commonIndex: findCommonIndex,
									 pos: findPos
								 }
							 }) => index === findIndex && commonIndex === findCommonIndex && findPos === pos)
		},
		showSizes() {
			this.isShowSizes = !this.isShowSizes
		}
	},
}
</script>

<style scoped lang="scss">

.buttons {
	padding-top: 20px;
}

.button + .button {
	margin-left: 8px;
}

.canvas {
	position: relative;
	user-select: none;
}

.controls {
	position: absolute;
	width: 100%;
	height: 100%;
	user-select: none;

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 6px;
		width: 40px;
		height: 40px;
		background: #FFFFFF;
		border-radius: 4px;
		cursor: pointer;
		transition: opacity .2s ease-in-out;
		border: none;
		outline: none;

		&:disabled {
			opacity: 0;
		}

		&:hover:not(:disabled) {
			background-color: #E3E5E8;
		}

	}

	.camera {
		position: absolute;
		left: 10px;
		top: 10px;

		&__variants {
			height: 4px;
			margin-top: auto;
			display: flex;
			justify-content: center;

			.item + .item {
				padding-left: 3px;
			}

			.item {
				display: flex;
				height: 4px;

				svg path {
					transition: .3s ease-in-out;
				}
			}
		}
	}

	.box-control {
		position: absolute;
		display: flex;
		justify-content: center;
		bottom: 10px;
		left: calc(50% - 108px);

		&.tabletop {
			left: calc(50% - 44px);
		}

		&.sizes {
			left: 10px;

			.size {
				transition: .2s ease;

				svg path {
					transition: .2s ease;
					fill: #5C6270;
				}

				&.active {
					background: #0099DC;

					svg path {
						fill: #ffffff;
					}
				}
			}
		}


		.left {
			&:disabled {
				opacity: 0;
			}
		}

		.open {
			&:disabled {
				opacity: 0;
			}
		}

		.remove {
			&:disabled {
				opacity: 0;
			}
		}

		.right {
			&:disabled {
				opacity: 0;
			}

			transform: rotateY(180deg);
		}

		&.active {
			.left, .right, .open{
				&:disabled {
					opacity: 0.4;
				}
			}
		}
	}

}
</style>
