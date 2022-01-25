import { BoxGeometry, Group } from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { mesh } from "./CustomMesh"

import Materials from "../Materials"
import { getFacadeLeft, getFacadeRight } from "./FacadeAnimation"

const { defaultMaterial } = Materials

const width = 6

const height = constants.topBound
const depth = constants.bottomDepth

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const sideY = (height - legsHeight) / 2 - sideDepth
const shelfGap = (height) / 6 - sideDepth * 1.5

const variants = ["597_1320_0_left_1",
	"597_1320_0_right_1",
	"597_602_0_solid_1",
	"597_716_0_solid_2",
	"597_716_0_solid_2##597_602_0_solid_1",
	"597_1320_0_left_1##597_716_0_solid_1",
	"597_1320_0_right_1##597_716_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 5.97,
		height: 13.2,
		positionX: 3,
		direction: "left"
	})

	facadeLeft.position.set(-2.99, height / 2 - 6.6, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant2 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeRight({
		width: 5.97,
		height: 13.2,
		positionX: -3,
		direction: "right"
	})

	facadeLeft.position.set(2.99, height / 2 - 6.6, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant3 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 5.97,
		height: 6.02,
		positionX: 3,
		direction: "left"
	})

	facadeLeft.position.set(-2.99, legsHeight / 2, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant4 = () => {
	const facadeGroup = new Group()

	const facadeLeft1 = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft1.position.set(-2.99, height / 2 - 3.58, depth /2)

	const facadeLeft2 = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft2.position.set(-2.99, -height / 2 + 3.58 + legsHeight, depth /2)

	facadeGroup.add(facadeLeft1)
	facadeGroup.add(facadeLeft2)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant5 = () => {
	const facadeGroup = new Group()

	const facadeLeft1 = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft1.position.set(-2.99, height / 2 - 3.58, depth /2)

	const facadeLeft2 = getFacadeLeft({
		width: 5.97,
		height: 6.02,
		positionX: 3,
		direction: "left"
	})

	facadeLeft2.position.set(-2.99, legsHeight / 2, depth /2)

	const facadeLeft3 = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft3.position.set(-2.99, -height / 2 + 3.58 + legsHeight, depth /2)

	facadeGroup.add(facadeLeft1)
	facadeGroup.add(facadeLeft2)
	facadeGroup.add(facadeLeft3)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant6 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 5.97,
		height: 13.2,
		positionX: 3,
		direction: "left"
	})

	facadeLeft.position.set(-2.99, height / 2 - 6.6, depth /2)

	const facadeLeft1 = getFacadeLeft({
		width: 5.97,
		height: 7.16,
		positionX: 3,
		direction: "left"
	})

	facadeLeft1.position.set(-2.99, -height / 2 + 3.58 + legsHeight, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.add(facadeLeft1)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

const facadeVariant7 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeRight({
		width: 5.97,
		height: 13.2,
		positionX: -3,
		direction: "right"
	})

	facadeLeft.position.set(2.99, height / 2 - 6.6, depth /2)

	const facadeLeft1 = getFacadeRight({
		width: 5.97,
		height: 7.16,
		positionX: -3,
		direction: "left"
	})

	facadeLeft1.position.set(2.99, -height / 2 + 3.58 + legsHeight, depth /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.add(facadeLeft1)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 1
	return facadeGroup
}

export const f_600_2140 = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"597_1320_0_left_1": facadeVariant1(),
			"597_1320_0_right_1": facadeVariant2(),
			"597_602_0_solid_1": facadeVariant3(),
			"597_716_0_solid_2": facadeVariant4(),
			"597_716_0_solid_2##597_602_0_solid_1": facadeVariant5(),
			"597_1320_0_left_1##597_716_0_solid_1": facadeVariant6(),
			"597_1320_0_right_1##597_716_0_solid_1": facadeVariant7()
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
	const sideBackGeometry = new BoxGeometry(width - sideDepth * 2, height - legsHeight, sideDepth)
	const shelfGeometry = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)

	const sideRight = mesh(sideGeometry, defaultMaterial())
	const sideLeft = mesh(sideGeometry, defaultMaterial())
	const sideBack = mesh(sideBackGeometry, defaultMaterial())

	const sideTop = mesh(shelfGeometry, defaultMaterial())

	const shelf0 = mesh(shelfGeometry, defaultMaterial())
	const shelf1 = mesh(shelfGeometry, defaultMaterial())
	const shelf2 = mesh(shelfGeometry, defaultMaterial())
	const shelf3 = mesh(shelfGeometry, defaultMaterial())
	const shelf4 = mesh(shelfGeometry, defaultMaterial())

	caseGroup.add(sideRight)
	caseGroup.add(sideLeft)
	caseGroup.add(sideBack)
	caseGroup.add(shelf0)
	caseGroup.add(shelf1)
	caseGroup.add(shelf2)
	caseGroup.add(shelf3)
	caseGroup.add(shelf4)
	caseGroup.add(sideTop)

	if (facadeName) boxGroup.add(facadeGroup)

	sideRight.position.set(width / 2 - sideDepth / 2, sideY, 0)
	sideLeft.position.set(-width / 2 + sideDepth / 2, sideY, 0)
	sideBack.position.set(0, sideY, -depth / 2 + sideDepth)

	shelf0.position.set(0, shelfGap * 1 + 0.6, 0)
	shelf1.position.set(0, shelfGap * 2 + 0.45, 0)
	shelf2.position.set(0, shelfGap * 3 + 0.1, 0)
	shelf3.position.set(0, shelfGap * 4 - 0.35, 0)
	shelf4.position.set(0, shelfGap * 5 - 0.6, 0)

	sideTop.position.y = height - legsHeight - sideDepth * 1.5

	boxGroup.name = "f_600_2140"
	boxGroup.userData.code = "f-600-2140"
	boxGroup.userData.noTableTop = true
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "penalBox"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facade = false

	boxGroup.scale.set(scale, scale, scale)
	return boxGroup
}
