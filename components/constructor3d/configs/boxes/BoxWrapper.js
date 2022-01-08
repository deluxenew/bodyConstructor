import {
	BoxGeometry, Group, Mesh, MeshMatcapMaterial, EdgesGeometry, LineSegments, LineBasicMaterial,
} from "three"

import { constants } from "./constants"

export const boxWrapper = (width, height, depth, isTop) => {
	const boxGroup = new Group()
	const boxGeometry = new BoxGeometry(width, height, depth)
	const matcapMaterial = new MeshMatcapMaterial({
		color: 0x0099DC, transparent: true, opacity: 0.15,
	})

	const boxMesh = new Mesh(boxGeometry, matcapMaterial)
	boxMesh.name = "transparent"
	boxMesh.visible = false
	boxMesh.position.set(0, isTop ? height / 2 : 0, 0)
	boxGroup.add(boxMesh)

	const edges = new EdgesGeometry(boxMesh.geometry)
	const line = new LineSegments(edges, new LineBasicMaterial({ color: 0x0099DC }))

	line.name = "edges"
	line.visible = false
	line.scale.set(1.01, 1, 1.1)
	line.position.set(0, isTop ? height / 2 - constants.sideDepth : 0, 0)

	boxGroup.add(line)

	boxGroup.position.set(-width / 2, height / 2, 0)

	boxGroup.name = "boxGroup"
	boxGroup.userData.width = width
	boxGroup.userData.height = height
	boxGroup.userData.depth = depth

	boxGeometry.dispose()
	edges.dispose()
	matcapMaterial.dispose()


	return boxGroup
}
