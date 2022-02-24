import { BoxGeometry, Group, BufferGeometry, BufferAttribute,PlaneBufferGeometry} from "three"
import * as THREE from "three"
import { constants } from "./constants"
import { bottomBox } from "./BottomBox"
import { bottomBeams } from "./BottomBeams"
import { mesh } from "./CustomMesh"
import { getFacadeLeft, getFacadeRight } from "./FacadeAnimation"

import Materials from "../Materials"

const { defaultMaterial, metalMaterial, darkMaterial } = Materials

const width = 8.539
const depth = width
const height = 23.22

const { sideDepth } = constants
const { legsHeight } = constants
const { scale } = constants

const bodyWidth = width
const bodyHeight = height -(constants.legsHeight)
const bodyDepth = bodyWidth

const bD = 4.17
const sP = 1.8 // катет дальнего угла
const bP = bD - sideDepth // глубина навесных шкафов
const bW = bodyWidth / 2 - sideDepth

const sideY = (height - legsHeight) / 2 - sideDepth

const gipo = Math.sqrt(Math.pow(width-bD,2)*2)

const variants = ["397_716_0_solid_1##147_716_0_solid_1##40_716_0_solid_1"]

const facadeVariant1 = () => {
	const facadeGroup = new Group()
	
	const facadeLeft = getFacadeLeft({
		width: gipo,
		height: bodyHeight,
		positionX: gipo/2,
		direction: "left"
	})

	facadeLeft.position.set(0, height / 2 - sideDepth, 0)

	facadeGroup.add(facadeLeft)
	facadeGroup.name = "facade"
	facadeGroup.userData.facadeQuantity = 2
	facadeGroup.position.y = -bodyHeight/2 + sideDepth
	facadeGroup.rotation.y = THREE.Math.degToRad(45)
	facadeGroup.position.x = -bodyWidth/2 + sideDepth + bP//+ (bodyWidth-bP)/2 + bP
	facadeGroup.position.z = bodyWidth/2 + sideDepth/2 - sideDepth//((bodyWidth-bP)/2 + bP)/2
	return facadeGroup
}

export const f_800a = (facadeName, onlyFacade) => {
	let facadeGroup

	if (facadeName) {
		if (!variants.includes(facadeName)) return
		const facades = {
			"397_716_0_solid_1##147_716_0_solid_1##40_716_0_solid_1": facadeVariant1(),
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

	//const  boxGroup  = new Group()



	const boxWidth = bodyWidth
	const boxHeight = bodyHeight
	const boxDepth = bodyDepth

	const gSideLR = new BoxGeometry(bD, boxHeight + legsHeight, sideDepth)
	const gSideBack = new BoxGeometry(boxWidth - sideDepth * 2, boxHeight + legsHeight, sideDepth)
	const gSideBottom = new BoxGeometry(boxWidth - sideDepth * 2, boxDepth, sideDepth)


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

	const verticesBack = [
		{ pos: [-bW + sP, height/2, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A
		{ pos: [-bW + sP, -height/2, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A1
		{ pos: [-bW, height/2, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F

		{ pos: [-bW + sP, -height/2, -bW], norm: [-1, 0, -1], uv: [0, 0] }, // A1
		{ pos: [-bW, -height/2, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F1
		{ pos: [-bW, height/2, -bW + sP], norm: [-1, 0, -1], uv: [0, 0] }, // F
	]
	const geometryBack = new PlaneBufferGeometry(gipo + sideDepth*2,bodyHeight)
 
	const sideAngularBack = mesh(geometryBack, defaultMaterial())
	sideAngularBack.rotation.y = THREE.Math.degToRad(45)
	sideAngularBack.position.z = -width/2 + sP/2
	sideAngularBack.position.x = -width/2 + sP/2

	const geometryFrontBottom = new PlaneBufferGeometry(gipo,legsHeight)
	const sideFrontBottom = mesh(geometryFrontBottom, defaultMaterial())
	sideFrontBottom.position.y = -bodyHeight/2 - sideDepth*2
	sideFrontBottom.rotation.y = THREE.Math.degToRad(45)
	sideFrontBottom.position.x = -(bodyWidth-gipo)/2-gipo/2 +bP+ (bodyWidth-bP)/2 - sideDepth
	sideFrontBottom.position.z = bodyWidth/2 -(bodyWidth-bP)/2   - sideDepth

	//var RoundedBoxGeometry = require('three-rounded-box')(THREE); //pass your instance of three
	const geometryShtanga = new BoxGeometry(boxWidth-sideDepth*2, sideDepth*2, sideDepth)
	const shtanga = mesh( geometryShtanga, metalMaterial());

	const shtangaM = new Group()
	const geometryMShtangaTB = new BoxGeometry(boxWidth-sideDepth*2, sideDepth/2, sideDepth/2)
	const geometryMShtangaLR = new BoxGeometry(sideDepth/2, sideDepth*4, sideDepth/2)
	const geometryShtangaMM = new BoxGeometry(boxWidth-sideDepth*2, sideDepth, sideDepth/4)
	const geometryShtangaBS = new BoxGeometry(sideDepth*2, sideDepth, sideDepth)
	const geometryShtangaBL = new BoxGeometry(sideDepth*3, sideDepth*2, sideDepth)
	const shtangaML = mesh( geometryMShtangaLR, metalMaterial());
	const shtangaMR = mesh( geometryMShtangaLR, metalMaterial());
	const shtangaMT = mesh( geometryMShtangaTB, metalMaterial());
	const shtangaMB = mesh( geometryMShtangaTB, metalMaterial());
	const shtangaMM = mesh( geometryShtangaMM, metalMaterial());
	const shtangaBS = mesh( geometryShtangaBS, darkMaterial());
	const shtangaBL = mesh( geometryShtangaBL, darkMaterial());
	
	shtangaMM.position.y = sideDepth*3 - sideDepth/2
	shtangaMT.position.y = sideDepth - sideDepth/4
	shtangaMB.position.y = -(sideDepth*3 - sideDepth/4)
	shtangaML.position.y = -sideDepth
	shtangaMR.position.y = -sideDepth
	shtangaBL.position.y = sideDepth*2
	shtangaBS.position.y = sideDepth/2 + sideDepth
	shtangaBL.position.x = -(boxWidth-sideDepth*2)/2 + sideDepth*3/2
	shtangaBS.position.x = (boxWidth-sideDepth*2)/2 - sideDepth
	shtangaML.position.x = -(boxWidth-sideDepth*2)/2 + sideDepth/4
	shtangaMR.position.x = (boxWidth-sideDepth*2)/2 - sideDepth/4
	shtangaM.add(shtangaMM)
	shtangaM.add(shtangaML)
	shtangaM.add(shtangaMR)
	shtangaM.add(shtangaMT)
	shtangaM.add(shtangaMB)
	shtangaM.add(shtangaBS)
	shtangaM.add(shtangaBL)

	shtangaM.position.y = 2

	const sideV = mesh(geometry, defaultMaterial())

	const sideLeft = mesh(gSideLR, defaultMaterial())
	const sideRight = mesh(gSideLR, defaultMaterial())
	const sideBackR = mesh(gSideBack, defaultMaterial())
	const sideBackL = mesh(gSideBack, defaultMaterial())
	const sideBottom = mesh(geometry, defaultMaterial())
	const sideBTop = mesh(geometry, defaultMaterial())

	const group = mesh()

	//group.add(shtanga)
	//group.add(shtangaM)

	sideV.position.y = boxHeight/2 -3 - sideDepth/2
	// sideV.position.x = sideDepth / 2;
	// sideV.position.z = sideDepth / 2;
	// sideV.rotation.y = Math.degToRad(90);
	group.add(sideV)

	// sideLeft.rotation.y = Math.degToRad(-90);
	sideLeft.position.z = (boxDepth / 2 - sideDepth / 2)
	sideLeft.position.x = -(boxDepth / 2 - bD/2 /* - sideDepth / 2 */)
	sideLeft.position.y = -legsHeight/2
	sideRight.rotation.y = THREE.Math.degToRad(90)
	sideRight.position.x = (boxWidth / 2 - sideDepth / 2)
	sideRight.position.z = -(boxDepth / 2 - bD/2 /* - sideDepth / 2 */)
	sideRight.position.y = -legsHeight/2
	sideBackR.position.z = -(boxDepth / 2 - sideDepth / 2)
	sideBackR.position.y = -legsHeight/2
	sideBackL.position.x = -(boxWidth / 2 - sideDepth / 2)
	sideBackL.position.y = -legsHeight/2
	sideBackL.rotation.y = THREE.Math.degToRad(90)
	// sideBottom.rotation.x = Math.degToRad(-90);
	// sideShelf.rotation.x = Math.degToRad(-90);
	sideBottom.position.y = -(boxHeight / 2)
	// sideBTop.rotation.x = Math.degToRad(-90);
	sideBTop.position.y = (boxHeight / 2 - sideDepth)
	// sideBTop.position.z = (-boxDepth / 2 + sideTop / 2 + sideDepth);
	
	group.add(sideAngularBack)
	group.add(sideFrontBottom)

	group.add(sideLeft)
	group.add(sideRight)
	group.add(sideBackR)
	group.add(sideBackL)
	group.add(sideBottom)
	group.add(sideBTop)
	//group.add(objFacadeLeft)
	group.name = "group"

	/*const sizeMesh = GetTextMesh(`${width * 100}`, width)
	sizeMesh.position.x = -width /2 + 0.01
	sizeMesh.position.y = - 1.1
	sizeMesh.position.z = 0.01
	sizeMesh.rotateY(Math.degToRad(90))*/

	/*const arrows = GetArrows(width)
	arrows.position.x = -width /2 + 0.01
	arrows.position.y = - 1.1
	arrows.position.z = 0.01
	arrows.rotateY(Math.degToRad(90))
	boxGroup.add(arrows)*/

	//boxGroup.add(sizeMesh)

	boxGroup.add(group)

	group.position.y += constants.sideDepth*2

	if (facadeName) boxGroup.add(facadeGroup)

	boxGroup.name = "f_800a"
	boxGroup.userData.code = "f-800a"
	boxGroup.userData.facadeVariants = variants
	boxGroup.userData.configType = "angularBox"
	boxGroup.userData.openedDoors = false
	boxGroup.userData.productType = "Напольный угловой"
	boxGroup.userData.facade = false

	return boxGroup
}
