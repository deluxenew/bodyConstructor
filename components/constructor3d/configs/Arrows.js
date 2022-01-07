import {
	MeshBasicMaterial, DoubleSide, Group, Mesh, Line, LineBasicMaterial, BufferGeometry, Vector3, Math,
} from "three"

export const GetArrows = (width) => {
	const arrowsObj = new Group()
	const pointsLeft = []
	const pointsRight = []
	const pointsMiddle = []

	pointsLeft.push(new Vector3(-width / 2, 1, 0))
	pointsLeft.push(new Vector3(-width / 2, 0, 0))
	pointsRight.push(new Vector3(width / 2, 1, 0))
	pointsRight.push(new Vector3(width / 2, 0, 0))
	pointsMiddle.push(new Vector3(-width / 2, 0.1, 0))
	pointsMiddle.push(new Vector3(width / 2, 0.1, 0))

	const geometryLeft = new BufferGeometry().setFromPoints(pointsLeft)
	const geometryRight = new BufferGeometry().setFromPoints(pointsRight)
	const geometryMiddle = new BufferGeometry().setFromPoints(pointsMiddle)

	const lineLeft = new Line(geometryLeft, new LineBasicMaterial({ color: 0x000000 }))
	const lineRight = new Line(geometryRight, new LineBasicMaterial({ color: 0x000000 }))
	const lineMiddle = new Line(geometryMiddle, new LineBasicMaterial({ color: 0x000000 }))

	arrowsObj.add(lineLeft)
	arrowsObj.add(lineRight)
	arrowsObj.add(lineMiddle)

	const pointsTriangle = []
	pointsTriangle.push(new Vector3(-width / 2, 0.1, 0))
	pointsTriangle.push(new Vector3(-width / 2 + 0.5, 0.2, 0))
	pointsTriangle.push(new Vector3(-width / 2 + 0.5, 0, 0))
	const triangleGeometry = new BufferGeometry().setFromPoints(pointsTriangle)
	const triangleMaterial = new MeshBasicMaterial({
		color: 0x000000,
		side: DoubleSide,
	})
	const triangleMesh = new Mesh(triangleGeometry, triangleMaterial)

	const triangleMeshRight = triangleMesh.clone()
	triangleMeshRight.rotateY(Math.degToRad(-180))

	arrowsObj.add(triangleMesh)
	arrowsObj.add(triangleMeshRight)

	return arrowsObj
}
