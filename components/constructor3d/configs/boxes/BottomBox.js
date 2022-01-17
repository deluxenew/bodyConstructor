import { BoxGeometry, CylinderGeometry, Group } from "three"
import { boxWrapper } from "./BoxWrapper"
import Materials from "../Materials"
import { mesh } from "./CustomMesh"
import { GetTextMesh } from "../Text"
import { GetArrows } from "../Arrows"

const { defaultMaterial, legMaterial } = Materials

const sideDepth = 0.16

const legsHeight = 1
const legsRad = 0.3
const legFrontMargin = 0.38

export const bottomBox = (width, height, depth) => {
	const boxGroup = boxWrapper(width, height, depth)

	const gSideBottom = new BoxGeometry(width - sideDepth * 2, sideDepth, depth)
	const sideBottom = mesh(gSideBottom, defaultMaterial())
	sideBottom.position.y = -height / 2 + legsHeight

	const gLegFront = new BoxGeometry(width, legsHeight, sideDepth)
	const legFront = mesh(gLegFront, defaultMaterial())
	legFront.position.set(0, legsHeight / 2 - height / 2, depth / 2 - legFrontMargin - sideDepth)

	const gLegs = new CylinderGeometry(legsRad, legsRad, legsHeight, 16)

	const legLeft = mesh(gLegs, legMaterial())
	const legRight = mesh(gLegs, legMaterial())
	legLeft.position.y = -height / 2 + legsHeight / 2
	legLeft.position.z = -depth / 2 + legsRad / 2 + legFrontMargin
	legLeft.position.x = -width / 2 + legsRad + legFrontMargin
	legRight.position.y = -height / 2 + legsHeight / 2
	legRight.position.z = -depth / 2 + legsRad / 2 + legFrontMargin
	legRight.position.x = width / 2 - legsRad - legFrontMargin

	const sizeMesh = GetTextMesh(`${width * 100}`, width)
	sizeMesh.position.y = -height / 2
	sizeMesh.position.z = depth / 2 + 0.02

	const arrows = GetArrows(width)
	arrows.position.y = -height / 2
	arrows.position.z = depth / 2 + 0.02
	boxGroup.add(arrows)

	boxGroup.add(sizeMesh)
	boxGroup.add(sideBottom)
	boxGroup.add(legFront)
	boxGroup.add(legLeft)
	boxGroup.add(legRight)

	const caseGroup = new Group()
	caseGroup.position.y = -height / 2 + legsHeight + sideDepth
	boxGroup.position.set(-width / 2, height / 2, depth / 2)

	caseGroup.name = "caseGroup"
	boxGroup.userData.pos = "floor"
	boxGroup.userData.product = "Шкаф"
	boxGroup.userData.productType = "Напольный"


	return {
		boxGroup,
		caseGroup,
	}
}
