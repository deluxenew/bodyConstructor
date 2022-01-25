import {
	BoxGeometry,
	Group,
	BufferGeometry,
	Math,
	BufferAttribute,
} from "three"
import { constants } from "./constants"
import { mesh } from "./CustomMesh"
import { topBox } from "./TopBox"
import { GetTextMesh } from "../Text"

import Materials from "../Materials"
import { GetArrows } from "../Arrows"
import { getFacadeLeft } from "./FacadeAnimation"

const { defaultMaterial } = Materials

const width = constants.topDepth * 2

const height = constants.topHeight

const { sideDepth } = constants
const { scale } = constants


const variants = ["407_716_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()

	const facadeLeft = getFacadeLeft({
		width: 4.07,
		height: 7.16,
		positionX: 2,
		direction: "left"
	})

	facadeLeft.position.set(-2, height / 2 - sideDepth, 2.2 /2)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 2
	facadeGroup.rotation.y = Math.degToRad(45)
	facadeGroup.position.x += .6
	facadeGroup.position.z += .6
	return facadeGroup
}

export const w_800a = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"407_716_0_solid_1": facadeVariant1(),
		}
		facadeGroup = facades[facadeName]

		facadeGroup.name = "facade"

		if (onlyFacade) return facadeGroup
	}
	const wrap = topBox(width, height, width)
	const { boxGroup } = wrap
	const { caseGroup } = wrap
	boxGroup.add(caseGroup)

	const bodyWidth = width
	const bodyHeight = height
	const bodyDepth = bodyWidth

	const bD = constants.topDepth
	const sP = 0 // катет дальнего угла
	const bP = bD - sideDepth // глубина навесных шкафов
	const bW = bodyWidth / 2 - sideDepth

	const boxWidth = bodyWidth
	const boxHeight = bodyHeight
	const boxDepth = bodyDepth

	const gSideLR = new BoxGeometry(bD, boxHeight, sideDepth)
	const gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight, sideDepth)
	const gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth)

	// create a simple square shape. We duplicate the top left and bottom right
	// vertices because each vertex needs to appear once per triangle.

	const vertices = [

		// front1
		{ pos: [-bW, sideDepth, bW], norm: [0, 0, 1], uv: [0, 0] }, // E
		{ pos: [-bW, 0, bW], norm: [0, 0, 1], uv: [0, 0] }, // E1
		{ pos: [-bW + bP, sideDepth, bW], norm: [0, 0, 1], uv: [0, 0] }, // D

		{ pos: [-bW + bP, sideDepth, bW], norm: [0, 0, 1], uv: [0, 0] }, // D
		{ pos: [-bW, 0, bW], norm: [0, 0, 1], uv: [0, 0] }, // E1
		{ pos: [-bW + bP, 0, bW], norm: [0, 0, 1], uv: [0, 0] }, // D1

		// front
		{ pos: [-bW + bP, sideDepth, bW], norm: [1, 0, 1], uv: [0, 0] }, // D
		{ pos: [-bW + bP, 0, bW], norm: [1, 0, 1], uv: [0, 0] }, // D1
		{ pos: [bW, sideDepth, -bW + bP], norm: [1, 0, 1], uv: [0, 0] }, // C

		{ pos: [bW, sideDepth, -bW + bP], norm: [1, 0, 1], uv: [0, 0] }, // C
		{ pos: [-bW + bP, 0, bW], norm: [1, 0, 1], uv: [0, 0] }, // D1
		{ pos: [bW, 0, -bW + bP], norm: [1, 0, 1], uv: [0, 0] }, // C1

		// front2
		{ pos: [bW, sideDepth, -bW + bP], norm: [1, 0, 0], uv: [0, 0] }, // C
		{ pos: [bW, 0, -bW + bP], norm: [1, 0, 0], uv: [0, 0] }, // C1
		{ pos: [bW, sideDepth, -bW], norm: [1, 0, 0], uv: [0, 0] }, // B

		{ pos: [bW, sideDepth, -bW], norm: [1, 0, 0], uv: [0, 0] }, // B
		{ pos: [bW, 0, -bW + bP], norm: [1, 0, 0], uv: [0, 0] }, // C1
		{ pos: [bW, 0, -bW], norm: [1, 0, 0], uv: [0, 0] }, // B1

		// back1
		{ pos: [bW, sideDepth, -bW], norm: [0, 0, -1], uv: [0, 0] }, // B
		{ pos: [bW, 0, -bW], norm: [0, 0, -1], uv: [0, 0] }, // B1
		{ pos: [-bW + sP, sideDepth, -bW], norm: [0, 0, -1], uv: [0, 0] }, // A

		{ pos: [-bW + sP, sideDepth, -bW], norm: [0, 0, -1], uv: [0, 0] }, // A
		{ pos: [bW, 0, -bW], norm: [0, 0, -1], uv: [0, 0] }, // B1
		{ pos: [-bW + sP, 0, -bW], norm: [0, 0, -1], uv: [0, 0] }, // A1

		// back
		{ pos: [-bW + sP, sideDepth, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A
		{ pos: [-bW + sP, 0, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A1
		{ pos: [-bW, sideDepth, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F

		{ pos: [-bW + sP, 0, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A1
		{ pos: [-bW, 0, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F1
		{ pos: [-bW, sideDepth, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F

		// back2
		{ pos: [-bW, sideDepth, -bW + sP], norm: [-1, 0, 0], uv: [0, 0] }, // F
		{ pos: [-bW, 0, -bW + sP], norm: [-1, 0, 0], uv: [0, 0] }, // F1
		{ pos: [-bW, sideDepth, bW], norm: [-1, 0, 0], uv: [0, 0] }, // E

		{ pos: [-bW, sideDepth, bW], norm: [-1, 0, 0], uv: [0, 0] }, // E
		{ pos: [-bW, 0, -bW + sP], norm: [-1, 0, 0], uv: [0, 0] }, // F1
		{ pos: [-bW, 0, bW], norm: [-1, 0, 0], uv: [0, 0] }, // E1

		// top
		{ pos: [bW, sideDepth, -bW], norm: [0, 1, 0], uv: [0, 0] }, // B
		{ pos: [-bW + sP, sideDepth, -bW], norm: [0, 1, 0], uv: [0, 0] }, // A
		{ pos: [bW, sideDepth, -bW + bP], norm: [0, 1, 0], uv: [0, 0] }, // C

		{ pos: [bW, sideDepth, -bW + bP], norm: [0, 1, 0], uv: [0, 0] }, // C
		{ pos: [-bW + sP, sideDepth, -bW], norm: [0, 1, 0], uv: [0, 0] }, // A
		{ pos: [-bW, sideDepth, -bW + sP], norm: [0, 1, 0], uv: [0, 0] }, // F

		{ pos: [-bW + bP, sideDepth, bW], norm: [0, 1, 0], uv: [0, 0] }, // D
		{ pos: [bW, sideDepth, -bW + bP], norm: [0, 1, 0], uv: [0, 0] }, // C
		{ pos: [-bW, sideDepth, -bW + sP], norm: [0, 1, 0], uv: [0, 0] }, // F

		{ pos: [-bW, sideDepth, bW], norm: [0, 1, 0], uv: [0, 0] }, // E
		{ pos: [-bW + bP, sideDepth, bW], norm: [0, 1, 0], uv: [0, 0] }, // D
		{ pos: [-bW, sideDepth, -bW + sP], norm: [0, 1, 0], uv: [0, 0] }, // F

		// bottom
		{ pos: [-bW + sP, 0, -bW], norm: [0, -1, 0], uv: [0, 0] }, // A1
		{ pos: [bW, 0, -bW], norm: [0, -1, 0], uv: [0, 0] }, // B1
		{ pos: [bW, 0, -bW + bP], norm: [0, -1, 0], uv: [0, 0] }, // C1

		{ pos: [-bW + sP, 0, -bW], norm: [0, -1, 0], uv: [0, 0] }, // A1
		{ pos: [bW, 0, -bW + bP], norm: [0, -1, 0], uv: [0, 0] }, // C1
		{ pos: [-bW, 0, -bW + sP], norm: [0, -1, 0], uv: [0, 0] }, // F1

		{ pos: [-bW, 0, -bW + sP], norm: [0, -1, 0], uv: [0, 0] }, // F1
		{ pos: [bW, 0, -bW + bP], norm: [0, -1, 0], uv: [0, 0] }, // C1
		{ pos: [-bW + bP, 0, bW], norm: [0, -1, 0], uv: [0, 0] }, // D1

		{ pos: [-bW, 0, bW], norm: [0, -1, 0], uv: [0, 0] }, // E1
		{ pos: [-bW, 0, -bW + sP], norm: [0, -1, 0], uv: [0, 0] }, // F1
		{ pos: [-bW + bP, 0, bW], norm: [0, -1, 0], uv: [0, 0] }, // D1
	]

	const positions = []
	const normals = []
	const uvs = []
	for (const vertex of vertices) {
		positions.push(...vertex.pos)
		normals.push(...vertex.norm)
		uvs.push(...vertex.uv)
	}

	const geometry = new BufferGeometry()
	const positionNumComponents = 3
	const normalNumComponents = 3
	const uvNumComponents = 2
	geometry.setAttribute(
		"position",
		new BufferAttribute(new Float32Array(positions), positionNumComponents),
	)
	geometry.setAttribute(
		"normal",
		new BufferAttribute(new Float32Array(normals), normalNumComponents),
	)
	geometry.setAttribute(
		"uv",
		new BufferAttribute(new Float32Array(uvs), uvNumComponents),
	)

	const sideV = mesh(geometry, defaultMaterial())

	const sideLeft = mesh(gSideLR, defaultMaterial())
	const sideRight = mesh(gSideLR, defaultMaterial())
	const sideBackR = mesh(gSideBack, defaultMaterial())
	const sideBackL = mesh(gSideBack, defaultMaterial())
	const sideBottom = mesh(geometry, defaultMaterial())
	const sideBTop = mesh(geometry, defaultMaterial())
	// let sideShelf = mesh(gSideBottom, defaultMaterial());
	const facadeLeft = new Group()
	// let facadeRight = new Group();

	const objFacadeLeft = new Group()
	objFacadeLeft.add(facadeLeft)
	facadeLeft.name = "doorBox"
	facadeLeft.position.x = boxWidth / 4 - sideDepth / 2
	objFacadeLeft.position.x = -boxWidth / 2 + sideDepth / 2
	objFacadeLeft.position.z = boxDepth / 2 + sideDepth / 2
	objFacadeLeft.name = "leftDoor"

	/* let objFacadeRight = new Group();
  objFacadeRight.add(facadeRight);
  facadeRight.name = 'doorBox'
  facadeRight.position.x = -boxWidth / 4 + sideDepth / 2;
  objFacadeRight.position.x = boxWidth / 2 - sideDepth / 2;
  objFacadeRight.position.z = boxDepth / 2 + sideDepth / 2;
  objFacadeRight.name = 'rightDoor' */

	const group = mesh()

	sideV.position.y = 0
	// sideV.position.x = sideDepth / 2;
	// sideV.position.z = sideDepth / 2;
	// sideV.rotation.y = Math.degToRad(90);
	group.add(sideV)

	// sideLeft.rotation.y = Math.degToRad(-90);
	sideLeft.position.z = (boxDepth / 2 - sideDepth / 2)
	sideLeft.position.x = -(boxDepth / 4 /* - sideDepth / 2 */)
	sideRight.rotation.y = Math.degToRad(90)
	sideRight.position.x = (boxWidth / 2 - sideDepth / 2)
	sideRight.position.z = -(boxDepth / 4 /* - sideDepth / 2 */)
	sideBackR.position.z = -(boxDepth / 2 - sideDepth / 2)
	sideBackL.position.x = -(boxWidth / 2 - sideDepth / 2)
	sideBackL.rotation.y = Math.degToRad(90)
	// sideBottom.rotation.x = Math.degToRad(-90);
	// sideShelf.rotation.x = Math.degToRad(-90);
	sideBottom.position.y = -(boxHeight / 2)
	// sideBTop.rotation.x = Math.degToRad(-90);
	sideBTop.position.y = (boxHeight / 2 - sideDepth)
	// sideBTop.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);

	group.add(sideLeft)
	group.add(sideRight)
	group.add(sideBackR)
	group.add(sideBackL)
	group.add(sideBottom)
	group.add(sideBTop)
	group.add(objFacadeLeft)
	group.name = "group"

	const sizeMesh = GetTextMesh(`${width * 100}`, width)
	sizeMesh.position.x = -width /2 + 0.01
	sizeMesh.position.y = - 1.1
	sizeMesh.position.z = 0.01
	sizeMesh.rotateY(Math.degToRad(90))

	const arrows = GetArrows(width)
	arrows.position.x = -width /2 + 0.01
	arrows.position.y = - 1.1
	arrows.position.z = 0.01
	arrows.rotateY(Math.degToRad(90))
	boxGroup.add(arrows)

	boxGroup.add(sizeMesh)

	boxGroup.add(group)

	group.position.y = boxHeight / 2 - sideDepth

	if (facadeName) boxGroup.add(facadeGroup)

	boxGroup.scale.set(scale, scale, scale)

	defaultMaterial().dispose()
	gSideLR.dispose()
	gSideBack.dispose()
	gSideBottom.dispose()
	boxGroup.rotation.y = Math.degToRad(-90)

	boxGroup.name = "w_800a"
	boxGroup.userData.code = "w-800a"
	boxGroup.userData.configType = "angularBox"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.facade = false

	boxGroup.userData.productType = "Навесной угловой"

	return boxGroup
}
