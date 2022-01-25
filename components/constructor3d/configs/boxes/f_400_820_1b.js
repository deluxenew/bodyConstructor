import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { Drawer } from "./Drawer"
import { mesh } from "./CustomMesh"

import Materials from "../Materials"
import { getFacadeFront } from "./FacadeAnimation"

const { defaultMaterial } = Materials


const width = 4

const height = constants.bottomHeight
const depth = constants.bottomDepth

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height - legsHeight) / 2 - sideDepth

const drawerHeight = 0.87

const variants = ["397_716_1_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeFront({
		width: 3.97,
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

export const f_400_820_1b = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"397_716_1_solid_1": facadeVariant1(),
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
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())
	const shelf = mesh(shelfGeometry, defaultMaterial())

	const drawer = Drawer(width, height, depth, drawerHeight)
	drawer.position.y = height - legsHeight - sideDepth - constants.drawerTopGap - drawerHeight
	caseGroup.add(drawer)

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(shelf)
	caseGroup.add(beams)

	if (facadeName) boxGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)
	shelf.position.set(0, sideY, 0)

	const facadeGroup1 = mesh()
	facadeGroup1.position.set(-width / 2 - sideDepth / 2, sideY, depth / 2)
	const facadeGeometry = new BoxGeometry(width - sideDepth / 4, height - legsHeight, sideDepth)
	const facade = mesh(facadeGeometry, defaultMaterial())
	facade.position.x = (width / 2 + sideDepth / 8)
	facadeGroup1.name = "facade"
	facadeGroup1.code = "397_716_0_solid_1"
	facadeGroup1.visible = false
	facadeGroup1.add(facade)
	caseGroup.add(facadeGroup1)

	boxGroup.name = "f_400_820_1b"
	boxGroup.userData.code = "f-400-820-1b"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
