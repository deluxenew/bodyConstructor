import * as THREE from "three"
import { constants } from "./configs/boxes/constants"

const { Math: threeMath } = THREE

const animationFromTo = (scene) => {
	const xAxis = new THREE.Vector3(-1, 1, 1)
	const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0)
	const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI)
	const quaternionKF = new THREE.QuaternionKeyframeTrack(".quaternion", [0, 1, 2], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w])
	//
	const clip = new THREE.AnimationClip("Action", 33, [quaternionKF])
	const mixer = new THREE.AnimationMixer(scene)
	//
	const clipAction = mixer.clipAction(clip)
	clipAction.play()
	mixer.update()
}

const fromTo = (value, from, to, steps) => {
	let step = 0
	if (value === to) return value
	if (from < to) {
		if (value < to) {
			step = (to - from) / steps
			if (value + step < to) {
				return value + step
			}
			return to
		}
	} else if (from > to) {
		if (value > to) {
			step = (from - to) / steps
			if (value - step > to) {
				return value - step
			}
			return to
		}
	}
}
const camToTableTop = (selectedTableTop) => {
	const { userData: { width, pos }, position: { x, z } } = selectedTableTop

	const h2 = Math.tan(threeMath.degToRad(90 - constants.camAngle / 2)) * width / 2 //+ constants.tableTopDepth / 2

	return {
		cameraPositionX: 0,
		cameraPositionY: h2 * 0.9 > 20 ? h2 * 0.9 : 20,
		cameraPositionZ: h2 * 0.9 > 18 ? h2 * 0.9 : 18,
		cameraRotationX: threeMath.degToRad(-45),
		sceneRotationY: pos === "right" ? threeMath.degToRad(90) : 0,
		scenePositionX: pos === "right" ? -z : -x
	}
}


const camPos = (position, wrb, wlb, wrt, wlt) => {
	function povSet(wL, wR, camAngle, camZ, pos) {
		wL += 3
		wR += 3
		switch (pos) {
			case 1: {
				wL += 3
				wR += 3
				break
			}
			case 2: {
				wL = 3
				break
			}
			case 3: {
				wR = 3
				break
			}
		}
		const heightForCam = 20
		const alfa = Math.atan(wL / wR)
		const g = Math.sqrt(wL ** 2 + wR ** 2)
		const a = wL ** 2 / g
		const b = g - a
		const h = Math.sqrt(a * b)
		const h2 = Math.tan(threeMath.degToRad(90 - camAngle / 2)) * g / 2 + h / 2

		let cameraPositionZ = 0
		if (h2 > camZ) {
			cameraPositionZ = h2
		} else {
			cameraPositionZ = camZ
		}
		//console.log(threeMath.degToRad(45 * 2) - Math.atan(Math.sqrt((h2 + h) * 2 + heightForCam ** 2) / (h2 + h)) * 2)

		return {
			cameraPositionX: 0,
			cameraPositionY: 13,
			cameraPositionZ,
			cameraRotationX: threeMath.degToRad(0),
			sceneRotationY: threeMath.degToRad(90) - alfa,
			scenePositionX: (a - b) / 2 - (threeMath.degToRad(45 * 2) - Math.atan(Math.sqrt((h2 + h) ** 2 + heightForCam ** 2) / (h2 + h)) * 2)
		}
	}

	const wr = Math.max(wrb, wrt)
	const wl = Math.max(wlb, wlt)
	console.log(wr, "wr", wl, "wl")

	const cameraPositions = {
		pos1: povSet(wl, wr, constants.camAngle, constants.camPositionZ, position),
		pos2: povSet(wl, wr, constants.camAngle, constants.camPositionZ, position),
		pos3: povSet(wl, wr, constants.camAngle, constants.camPositionZ, position),
	}
	return cameraPositions[`pos${position}`]
}
const cases = ["f150820",
	"f300820",
	"f400",
	"f4008203b",
	"f600",
	"f6008202b",
	"f6008203b",
	"f600820oven",
	"f6002140",
	"f800",
	"f800a",
	"f8008202b",
	"f8008203b",
	"f4008201b",
	"w150720",
	"w300720",
	"w400",
	"w500360",
	"w600",
	"w600360",
	"w600600",
	"w800",
	"w800a"]
const recursiveFindBox = (obj) => {
	if (!obj || !obj.parent) return null
	const { parent } = obj
	if (cases.includes(parent.name.replaceAll("_", "")) || parent.name === "tableTop") return parent
	return recursiveFindBox(parent)
}

const findActionName = (obj) => {
	if (!obj || !obj.parent) return null
	const { parent } = obj
	if (parent && parent.visible && parent.userData && parent.userData.actionName) return parent.userData.actionName
	return findActionName(parent)
}

const rotationY = (obj) => {
	obj.rotation.y = threeMath.degToRad(-90)
	return obj
}

const getPenalPadding = (position, width, penalPadding, penalBoxes) => {
	const penalParams = penalBoxes && penalBoxes.map(({ userData: { width: penalWidth, startPadding } }) => {
		return {
			start: startPadding - penalWidth / 2,
			end: startPadding + penalWidth / 2,
			penalWidth,
		}
	})
	// console.log(position, "position")
	const elStart = position - width / 2 + penalPadding
	const middle = position + penalPadding
	const elEnd = position + width / 2 + penalPadding

	// console.log(elStart, middle, elEnd, "elStart, middle, elEnd")

	let padding = penalPadding

	if (penalParams) {
		let paddingSum = 0
		penalParams.forEach(({ penalWidth, start, end }) => {
			const intersectStart = elStart + paddingSum >= start && elStart + paddingSum < end
			const intersectMiddle = middle + paddingSum >= start && middle + paddingSum < end
			const intersectEnd = elEnd + paddingSum > start && elEnd + paddingSum <= end
			if (intersectStart || intersectMiddle || intersectEnd) {
				paddingSum = start - elStart + penalWidth
			}
		})
		padding += paddingSum
	}
	return padding
}

const setCasesPosition = (boxes) => {
	const places = ["bottomLeft", "bottomRight", "topLeft", "topRight"]
	const groupBy = (list, key) => list.reduce((acc, el) => {
		if (places.includes(el.userData[key])) {
			(acc[el.userData[key]] = acc[el.userData[key]] || []).push(el)
		}
		return acc
	}, {})
	const groupedBoxes = groupBy(boxes.sort((a, b) => a.userData.sort - b.userData.sort), "type")

	const getPaddingBySort = (arr, elSort, elWidth, padding) => {
		const elPadding = arr.reduce((acc, el) => {
			const { userData: { sort, width } } = el
			if (elSort > sort) acc += width
			return acc
		}, 0)


		let result = elPadding + elWidth / 2 + padding

		return result
	}

	const wallPadding = 0.6
	const wallSidePadding = 0.02
	const angularPadding = 1.4
	const angularSidePadding = 0.6

	if (!!groupedBoxes.bottomLeft) {
		const isAngular = groupedBoxes.bottomRight && groupedBoxes.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")
		const padding = groupedBoxes.bottomRight && groupedBoxes.bottomRight[0].userData.depth + (isAngular ? wallPadding + angularSidePadding : 0) || 0
		const angularBox = groupedBoxes.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")

		groupedBoxes.bottomLeft.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			const startPadding = getPaddingBySort(groupedBoxes.bottomLeft, sort, width, angularBox ? wallPadding + angularPadding : padding + wallSidePadding)
			el.position.x = -startPadding
			el.position.z = depth / 2 + wallPadding
			el.userData["startPadding"] = startPadding
		})
	}

	if (!!groupedBoxes.bottomRight) {
		const isAngular = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")
		const padding = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft[0].userData.depth + (isAngular ? wallPadding + angularSidePadding : 0) || 0
		const angularBox = groupedBoxes.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")

		groupedBoxes.bottomRight.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			const startPadding = getPaddingBySort(groupedBoxes.bottomRight, sort, width, angularBox ? wallPadding + angularPadding : padding + wallSidePadding)
			el.position.z = startPadding
			el.position.x = -(depth / 2 + wallPadding)
			el.userData["startPadding"] = startPadding
		})
	}

	if (!!groupedBoxes.topLeft) {
		const padding = groupedBoxes.topRight && groupedBoxes.topRight[0].userData.depth || 0
		const angularBox = groupedBoxes.topLeft.find(({ userData: { configType } }) => configType === "angularBox")
		const penalBoxes = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft.filter(({ userData: { configType } }) => configType === "penalBox")

		let penalPadding = 0

		groupedBoxes.topLeft.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			let position = getPaddingBySort(groupedBoxes.topLeft, sort, width, angularBox ? 0 : padding)

			penalPadding = getPenalPadding(position, width, penalPadding, penalBoxes)
			position += penalPadding

			el.userData.penalPadding = penalPadding
			el.position.x = -position
			el.position.z = depth / 2
		})
	}

	if (!!groupedBoxes.topRight) {
		const padding = groupedBoxes.topLeft && groupedBoxes.topLeft[0].userData.depth || 0
		const angularBox = groupedBoxes.topRight.find(({ userData: { configType } }) => configType === "angularBox")
		const penalBoxes = groupedBoxes.bottomRight && groupedBoxes.bottomRight.filter(({ userData: { configType } }) => configType === "penalBox")

		let penalPadding = 0

		groupedBoxes.topRight.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			let position = getPaddingBySort(groupedBoxes.topRight, sort, width, angularBox ? 0 : padding)

			penalPadding = getPenalPadding(position, width, penalPadding, penalBoxes)
			position += penalPadding

			el.userData.penalPadding = penalPadding
			el.position.z = position
			el.position.x = -(depth / 2)
		})
	}
}

const getPlaceWidth = function({ arr, additionalArr, penalBoxes, modelWidth }) {
	let padding = 0
	if (additionalArr && !(arr && arr.find(({ configType }) => configType === "angularBox"))) {
		padding = additionalArr[0].depth
	}

	let currentPadding = 0
	let fullWidth = 0

	if (arr) {
		arr.forEach(({ width, penalPadding }) => {
			fullWidth += width
			if (penalPadding && currentPadding !== penalPadding) {
				currentPadding = penalPadding
			}
		})
	}

	if (penalBoxes) {
		const penalBoxPadding = getPenalPadding(fullWidth + modelWidth / 2, modelWidth, currentPadding, penalBoxes)
		if (penalBoxPadding) fullWidth += penalBoxPadding
	} else {
		fullWidth += 2
	}

	return fullWidth + padding
}

const getDrawerGroup = (obj) => {
	if (!obj) return null
	const caseGroup = obj.children.find(({ name }) => name === "caseGroup")
	if (caseGroup) {
		const drawer = caseGroup.children.filter(({ name }) => name === "drawer")
		if (drawer) return drawer
	}

	return null
}

const getFacadeGroup = (obj) => {
	if (!obj) return null
	const caseGroup = obj.children.find(({ name }) => name === "facade")
	if (caseGroup) {
		const facade = caseGroup.children.filter(({ name }) => name === "facadeElement")
		if (facade) return facade
	}

	return null
}

const getAddMethodName = (arrAddMethods, val) => {
	const name = arrAddMethods.find((el) => el.toLowerCase().indexOf(val.toLowerCase()) > -1)
	return name || ""
}

const getTableTops = (arr, across, maxWidth, minWidth) => {
	const tableTop = {
		width: 0,
		side: "",
		x: 0,
		z: 0,
		commonIndex: 0,
		index: 0,
		locked: true,
	}
	let padding = 0
	let angularExist = false
	let startPenalBox = false
	let needAdditionalPadding = true
	const wallSidePadding = 0.02
	const penalWidth = 6
	const tableTopDepth = 6

	return arr.reduce((acc, el) => {
		const { side, width, sort, x, z, configType } = el
		const isAngular = configType === "angularBox"
		const isLeft = side === "left"
		const getAccLength = (acc) => acc.length
		const fullWidth = (acc) => {
			return acc.reduce((full, { width: elWidth }) => {
				full += elWidth
				return full
			}, 0)
		}
		if (sort === 0 && width === 0) startPenalBox = true

		if (isAngular) angularExist = true
		if (angularExist) needAdditionalPadding = false

		function calcPadding() {
			if (sort === 0) {
				padding = wallSidePadding

				if (angularExist) padding = 0
				if (across && !angularExist) padding = tableTopDepth
			}
			if (width === 0) padding += penalWidth
		}

		function checkMaxWidth(isPenal) {
			if (tableTop.width >= maxWidth / 100) {
				const overage = tableTop.width - maxWidth / 100

				tableTop.width -= overage

				if (isLeft) tableTop.x += overage / 2
				else tableTop.z -= overage / 2

				acc.push({ ...tableTop })

				tableTop.index += 1
				tableTop.width = overage

				const position = fullWidth(acc) + padding + tableTop.width / 2

				if (isLeft) tableTop.x = -position + (isPenal ? penalWidth : 0)
				else tableTop.z = position - (isPenal ? penalWidth : 0)
			}
		}

		function correctLastTableTop() {
			if (tableTop.width < minWidth / 100 && tableTop.width !== 0 && acc[acc.length - 1]) {
				const missing = minWidth / 100 - tableTop.width

				acc[acc.length - 1].width -= missing

				if (isLeft) {
					acc[acc.length - 1].x += missing / 2
				} else {
					acc[acc.length - 1].z -= missing / 2
				}
				tableTop.width = minWidth / 100

				if (isLeft) {
					tableTop.x += missing / 2
				} else {
					tableTop.z -= missing / 2
				}
			}
		}

		function additionalWidthForFirst() {
			if (!across && !angularExist) {
				tableTop.width += wallSidePadding
				if (isLeft) {
					tableTop.x += wallSidePadding / 2
				} else {
					tableTop.z -= wallSidePadding / 2
				}
			}
		}

		function setTableTop() {
			if (width !== 0) {
				tableTop.width += width
				const position = padding + fullWidth(acc) + tableTop.width / 2

				if (isLeft) {
					tableTop.x = -position
					tableTop.z = z
				} else {
					tableTop.x = x
					tableTop.z = position
				}
			}

			if (sort === arr.length - 1 && tableTop.width !== 0 && width !== 0) {
				tableTop.width += 0.02
				if (isLeft) {
					tableTop.x -= 0.01
				} else {
					tableTop.z += 0.01
				}
				if ((!getAccLength(acc) && !startPenalBox && needAdditionalPadding) || (sort === 0 && width && needAdditionalPadding)) {
					additionalWidthForFirst()
					padding -= wallSidePadding
					needAdditionalPadding = false
				}

				checkMaxWidth(false)
				correctLastTableTop()

				if (tableTop.width) {
					tableTop.locked = false
					acc.push({ ...tableTop })
					tableTop.index = 0
				}
				tableTop.width = 0
			}
			if (width === 0) {
				if (needAdditionalPadding && !startPenalBox) {
					additionalWidthForFirst()
					needAdditionalPadding = false
					padding -= wallSidePadding
				}

				checkMaxWidth(true)
				correctLastTableTop()

				if (tableTop.width !== 0) {
					tableTop.locked = true
					acc.push({ ...tableTop })

					tableTop.index = 0
					tableTop.commonIndex += 1
				}
				tableTop.width = 0
			}
		}

		calcPadding()
		setTableTop()

		return acc
	}, [])
}

const setOrderFields = (userData) => {
	const fieldNames = [
		{
			id: "size",
			title: "Размер",
			sort: 0
		},
		// {
		// 	id: "product",
		// 	title: "Изделие",
		// 	sort: 1
		// },
		{
			id: "materialType",
			title: "Материал",
			sort: 2
		},
		{
			id: "productType",
			title: "Тип",
			sort: 3
		},
		{
			id: "color",
			title: "Цвет",
			sort: 4
		},
		{
			id: "quantity",
			title: "Количество",
			sort: 5,
			value: 1
		},
		{
			id: "price",
			title: "Цена",
			sort: 6,
			value: "X XXX р"
		},
		{
			id: "priceSum",
			title: "Сумма",
			sort: 7,
			value: "X XXX р"
		},
		{
			id: "spec",
			title: "Спецификация",
			sort: 8,
			value: ""
		},
		{
			id: "code",
			sort: 9,
		}
	]
	for (let field in userData) {
		if (Object.prototype.hasOwnProperty.call(userData, field)) {
			const findField = fieldNames.find((el) => el.id === field)
			if (findField) findField.value = userData[field]
		}
	}
	return fieldNames
}

const getImage = (url) => {
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

export default {
	animationFromTo,
	camToTableTop,
	fromTo,
	camPos,
	recursiveFindBox,
	findActionName,
	setCasesPosition,
	rotationY,
	getPlaceWidth,
	getDrawerGroup,
	getFacadeGroup,
	getAddMethodName,
	getTableTops,
	setOrderFields,
	getImage
}
