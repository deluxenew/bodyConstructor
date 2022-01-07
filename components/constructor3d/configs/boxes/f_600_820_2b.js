import { BoxGeometry, Mesh } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { Drawer } from "./Drawer"
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

const drawerHeight = 2.38

export const f_600_820_2b = () => {
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

	const drawer_0 = Drawer(width, height, depth, drawerHeight)
	drawer_0.position.y = constants.drawerBottomGap
	caseGroup.add(drawer_0)

	const drawer_1 = Drawer(width, height, depth, drawerHeight)
	drawer_1.position.y = height - legsHeight - sideDepth - constants.drawerTopGapBig - drawerHeight
	caseGroup.add(drawer_1)

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(beams)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	boxGroup.name = "f_600_820_2b"
	boxGroup.userData.code = "f-600-820-2b"
	// boxGroup.userData['facadeVariants'] = ['397_716_0_solid_2']
	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false

	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
