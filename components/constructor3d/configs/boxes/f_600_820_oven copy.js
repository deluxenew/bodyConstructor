import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
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

const drawerHeight = 0.48

const variants = ["597_116_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeFront({
		width: 5.97,
		height: 1.16,
		positionX: 0,
		positionY: legsHeight * 1.5 - height / 2 + sideDepth / 2,
		direction: "front"
	})

	facadeLeft.position.set(0, legsHeight * 1.5 - height / 2 + sideDepth / 2, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

export const f_600_820_oven = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"597_116_0_solid_1": facadeVariant1(),
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"	

		if (onlyFacade) return facadeGroup
	}
	const wrap = bottomBox(width, height, depth)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const sideGeometry = new BoxGeometry(sideDepth, height - legsHeight, depth)
	// const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth);
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const shelf = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(shelf)

	if (facadeName) boxGroup.add(facadeGroup)

	shelf.position.set(0, 0.94, 0)
	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)

	boxGroup.name = "f_600_820_oven"
	boxGroup.userData.code = "f-600-820-oven"
	// boxGroup.userData['facadeVariants'] = ['397_716_0_solid_2']

	boxGroup.userData.configType = "boxFloor"
	boxGroup.userData.openedDoors = false

	boxGroup.userData.productType = "Напольный духовой"

	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
