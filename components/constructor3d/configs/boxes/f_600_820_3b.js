import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { Drawer } from "./Drawer"
import { mesh } from "./CustomMesh"

import Materials from "../Materials"
import { getFacadeFront } from "./FacadeAnimation"

const { defaultMaterial } = Materials

const width = 6

const height = constants.bottomHeight
const depth = constants.bottomDepth

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height - legsHeight) / 2 - sideDepth

const drawer0Height = 2.38
const drawer12Height = 0.87

const variants = ["597_716_3_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeFront({
		width: 5.97,
		height: 7.16,
		positionX: 0,
		direction: "front"
	})

	facadeLeft.position.set(0, legsHeight / 2, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

export const f_600_820_3b = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"597_716_3_solid_1": facadeVariant1(),
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

	const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth)
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())

	const drawer0 = Drawer(width, height, depth, drawer0Height, constants.drawerBottomGap)
	drawer0.position.y = constants.drawerBottomGap
	caseGroup.add(drawer0)

	const drawer1PositionY = height - legsHeight - sideDepth - constants.drawerTopGap - drawer12Height * 2 - constants.drawerBetweenGap
	const drawer1 = Drawer(width, height, depth, drawer12Height, drawer1PositionY)
	drawer1.position.y = drawer1PositionY
	caseGroup.add(drawer1)

	const drawer2PositionY = height - legsHeight - sideDepth - constants.drawerTopGap - drawer12Height
	const drawer2 = Drawer(width, height, depth, drawer12Height, drawer2PositionY)
	drawer2.position.y = drawer2PositionY
	caseGroup.add(drawer2)

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(beams)

	if (facadeName) boxGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	boxGroup.name = "f_600_820_3b"
	boxGroup.userData.code = "f-600-820-3b"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
