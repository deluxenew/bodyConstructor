import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { mesh } from "./CustomMesh"

import Materials from "../Materials"

const { defaultMaterial } = Materials

const width = 6

const height = constants.bottomHeight
const depth = constants.bottomDepth

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height - legsHeight) / 2 - sideDepth

const facadeVariant1 = () => {
	const facadeGroup = new Group()
	const facadeLeft = new Group()
	facadeLeft.name = "facadeElement"
	facadeLeft.userData.facadeWidth = 5.97
	facadeLeft.userData.facadeHeight = 7.16
	facadeLeft.userData.facadeOpenDirection = "left"

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	return facadeGroup
}

const facadeVariant2 = () => {
	const facadeGroup = new Group()

	const facadeLeft = new Group()
	facadeLeft.name = "facadeElement"
	facadeLeft.userData.facadeWidth = 2.97
	facadeLeft.userData.facadeHeight = 7.16
	facadeLeft.userData.facadeOpenDirection = "left"

	facadeGroup.add(facadeLeft)

	const facadeRight = new Group()

	facadeRight.name = "facadeElement"
	facadeRight.userData.facadeWidth = 2.97
	facadeRight.userData.facadeHeight = 7.16
	facadeRight.userData.facadeOpenDirection = "right"

	facadeGroup.add(facadeRight)

	facadeGroup.name = "facade"
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
		console.log(facadeName, onlyFacade)
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}

	const beams = bottomBeams(width)
	const wrap = bottomBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth)
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())

	const shelf = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(beams)
	caseGroup.add(shelf)

	if (facadeName) caseGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)
	shelf.position.set(0, sideY, 0)

	boxGroup.name = "f_600"
	boxGroup.userData.code = "f-600"
	boxGroup.userData.facadeVariants = ["597_716_0_solid_1", "297_716_0_solid_2"]
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false


	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
