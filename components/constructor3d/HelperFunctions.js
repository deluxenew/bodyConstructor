import * as THREE from "three"
import boxes from "./configs/boxes/BoxesList"

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

		let cPz = 0
		if (h2 > camZ) {
			cPz = h2
		} else {
			cPz = camZ
		}

		return {
			x: threeMath.degToRad(45 * 2) - Math.atan(Math.sqrt((h2 + h) ** 2 + heightForCam ** 2) / (h2 + h)) * 2 /* - threeMath.degToRad(18) */,
			y: threeMath.degToRad(90) - alfa,
			sPx: (a - b) / 2,
			cPz,
		}
	}

	const wr = Math.max(wrb, wrt)
	const wl = Math.max(wlb, wlt)

	const cameraPositions = {
		pos1: povSet(wl, wr, 45, 50, position),
		pos2: povSet(wl, wr, 45, 50, position),
		pos3: povSet(wl, wr, 45, 50, position),
	}
	return cameraPositions[`pos${position}`]
}

const recursiveFindBox = (obj) => {
	if (!obj || !obj.parent) return null
	const { parent } = obj
	if ([...new Set(Object.keys(boxes))].includes(parent.name) || parent.name === "tableTop") return parent
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
	const angularPadding = 1.4

	if (groupedBoxes.bottomLeft) {
		const isAngular = groupedBoxes.bottomRight && groupedBoxes.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")
		const padding = groupedBoxes.bottomRight && groupedBoxes.bottomRight[0].userData.depth + (isAngular ? wallPadding : 0) || 0
		const angularBox = groupedBoxes.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")

		groupedBoxes.bottomLeft.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			const startPadding = getPaddingBySort(groupedBoxes.bottomLeft, sort, width, angularBox ? wallPadding + angularPadding : padding + wallPadding)
			el.position.x = -startPadding
			el.position.z = depth / 2 + wallPadding
			el.userData["startPadding"] = startPadding
		})
	}

	if (groupedBoxes.bottomRight) {
		const isAngular = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft.find(({ userData: { configType } }) => configType === "angularBox")
		const padding = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft[0].userData.depth + (isAngular ? wallPadding : 0) || 0
		const angularBox = groupedBoxes.bottomRight.find(({ userData: { configType } }) => configType === "angularBox")

		groupedBoxes.bottomRight.forEach((el) => {
			const { userData: { sort, width, depth } } = el
			const startPadding = getPaddingBySort(groupedBoxes.bottomRight, sort, width, angularBox ? wallPadding + angularPadding : padding + wallPadding)
			el.position.z = startPadding
			el.position.x = -(depth / 2 + wallPadding)
			el.userData["startPadding"] = startPadding
		})
	}

	if (groupedBoxes.topLeft) {
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

	if (groupedBoxes.topRight) {
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
	// console.log(arr, "arr")
	let padding = 0
	if (additionalArr && !(arr && arr.find(({ userData: { configType } }) => configType === "angularBox"))) {
		padding = additionalArr[0].userData.depth
	}


	// let paddingVariants = 0
	let currentPadding = 0
	let fullWidth = 0

	if (arr) {
		arr.forEach(({ userData: { width, configType, penalPadding } }) => {
			console.log(configType, "configType")
			// if (configType === "angularBox") fullWidth += 2
			fullWidth += width
			if (penalPadding && currentPadding !== penalPadding) {
				currentPadding = penalPadding
				// paddingVariants++
			}
			// if (penalPadding && index === arr.length - 1) fullWidth += penalPadding
		})
	}

	if (penalBoxes) {
		// console.log(currentPadding, "currentPadding")
		// console.log(currentPadding, "currentPadding")
		// console.log(fullWidth, "fullWidth")
		const penalBoxPadding = getPenalPadding(fullWidth + modelWidth / 2, modelWidth, currentPadding, penalBoxes)
		// console.log(penalBoxPadding, "penalBoxPadding")
		if (penalBoxPadding) fullWidth += penalBoxPadding
	}


	return fullWidth + padding
}

const getFacadeGroup = (obj) => {
	if (!obj) return null
	const caseGroup = obj.children.find(({ name }) => name === "caseGroup")
	if (caseGroup) {
		const facade = caseGroup.children.find(({ name }) => name === "facade")
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
	}
	let itemsCount = 0
	let counter = 0
	let padding = 0
	let angularExist = false
	let startPenalBox = false
	let remains = 0
	return arr.reduce((acc, el) => {
		itemsCount++
		const {
			side, width, sort, x, z, configType
		} = el
		const isAngular = configType === "angularBox"
		if (isAngular) angularExist = true

		if (itemsCount === 1) {
			counter = sort
			padding = side === "left" ? (sort === 0 ? x + 0.6 : x) + width / 2 - (isAngular ? 0.6 : 0) : (sort === 0 ? z - 0.6 : z) - width / 2 + (isAngular ? 0.6 : 0)
		}
		tableTop.side = side

		if (counter !== sort) {
			acc.push({ ...tableTop })
			tableTop.width = width
			padding = side === "left" ? x + width / 2 : z - width / 2
			tableTop.x = side === "left" ? padding - width / 2 : x
			tableTop.z = side === "left" ? z : padding + width / 2
			counter = sort
			counter++
			startPenalBox = true
		} else {
			if (tableTop.width + width >= maxWidth / 100) {
				remains += tableTop.width + width - maxWidth / 100
				tableTop.width = maxWidth / 100
				tableTop.x = side === "left" ? padding - maxWidth / 200 : x
				tableTop.z = side === "left" ? z : padding + maxWidth / 200


				acc.push({ ...tableTop })

				padding += side === "left" ? -(maxWidth / 100 - (!startPenalBox && !angularExist && across ? 0.6 : 0)) : maxWidth / 100 - (!startPenalBox && !angularExist && across ? 0.6 : 0)
				tableTop.width = remains + (!startPenalBox && !angularExist && across ? 0.6 : 0)
			} else {
				tableTop.width += (sort === 0 ? width + (angularExist ? 0 : (across ? 0 : 0.6)) : width)
			}

			tableTop.x = side === "left" ? padding - tableTop.width / 2 - (!startPenalBox && !angularExist && across ? 0.6 : 0) : x
			tableTop.z = side === "left" ? z : padding + tableTop.width / 2 + (!startPenalBox && !angularExist && across ? 0.6 : 0)
			counter++
		}
		if (arr.length === itemsCount) {
			if (width !== 0) {
				tableTop.width += 0.02

				if (tableTop.width < minWidth / 100) {
					const missing = minWidth / 100 - tableTop.width

					acc[acc.length - 1].width -= missing + (!startPenalBox && !angularExist && across ? 0.6 : 0)
					acc[acc.length - 1].x -= side === "left" ? -missing / 2 + (!startPenalBox && !angularExist && across ? 0.6 : 0) / 2 : 0
					acc[acc.length - 1].z += side === "left" ? 0 : -missing / 2 + (!startPenalBox && !angularExist && across ? 0.6 : 0) / 2

					tableTop.width = minWidth / 100

					tableTop.x += side === "left" ? -0.01 + missing / 2 : 0
					tableTop.z += side === "left" ? 0 : 0.01 - missing / 2
				} else {
					tableTop.x += side === "left" ? -0.01 : 0
					tableTop.z += side === "left" ? 0 : 0.01
				}
			}
			if (tableTop.width > 0.02) acc.push({ ...tableTop })

			startPenalBox = false
		}
		return acc
	}, [])
}

export default {
	animationFromTo,
	fromTo,
	camPos,
	recursiveFindBox,
	findActionName,
	setCasesPosition,
	rotationY,
	getPlaceWidth,
	getFacadeGroup,
	getAddMethodName,
	getTableTops,
}
