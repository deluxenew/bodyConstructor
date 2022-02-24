import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { mesh } from "./CustomMesh"
import { getFacadeLeft, getFacadeRight } from "./FacadeAnimation"
import { handle } from "./Handle"

import Materials from "../Materials"

const { defaultMaterial } = Materials

const width = 12

const height = 5.12
const depth = 4.17

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height - legsHeight) / 2 - sideDepth

const variants = ["597_716_0_solid_1", "297_716_0_solid_2"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft.position.set(-2.99, legsHeight / 2, depth /2 + sideDepth/2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant2 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 2.97,
		height: 7.16,
		positionX: 1.47,
		direction: "left"
	})

	facadeLeft.position.set(-2.97, legsHeight / 2, depth /2)

	const facadeRight = getFacadeRight({
		width: 2.97,
		height: 7.16,
		positionX: -1.47,
		direction: "right"
	})

	facadeRight.position.set(2.97, legsHeight / 2, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.add(facadeRight)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 2
	return facadeGroup
}

export const f_600 = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!["597_716_0_solid_1", "297_716_0_solid_2"].includes(facadeName)) return
		const facades = {
			"597_716_0_solid_1": facadeVariant1(),
			"297_716_0_solid_2": facadeVariant2()
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}

	const beams = bottomBeams(width)
	const wrap = bottomBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight- sideDepth*2, depth)
	const sideBTGeometry = new BoxGeometry(width, sideDepth, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight- sideDepth*2, sideDepth)
	const shelfGeometry = new BoxGeometry(sideDepth,height- legsHeight - sideDepth*2, depth)

	const sideBottom = mesh(sideBTGeometry, defaultMaterial())
	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())
	const sideTop = mesh(sideBTGeometry, defaultMaterial())
	
	//sideBottom.position.y = (height- legsHeight + sideDepth)/2
	sideTop.position.y = height- legsHeight - sideDepth -sideDepth/2
	
	const shelf = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideTop)
	caseGroup.add(sideBottom)
	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	//caseGroup.add(beams)
	caseGroup.add(shelf)

	const hndl = handle()
	//caseGroup.add(hndl)
	hndl.position.y = height/2 - constants.handleGap

	if (facadeName) boxGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)
	shelf.position.set(0, sideY, 0)

	boxGroup.name = "f_600"
	boxGroup.userData.code = "f-600"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false


	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
