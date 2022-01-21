import {
	BoxGeometry, Mesh, MeshMatcapMaterial, EdgesGeometry, LineSegments, LineBasicMaterial,
} from "three"
import { constants } from "./boxes/constants"

export const edgesHelper = (width, height, depth, isTop) => {
	const boxGeometry = new BoxGeometry(width + 0.01, height + 0.01, depth + 0.01)
	const matcapMaterial = new MeshMatcapMaterial({
		color: 0x0099DC, transparent: true, opacity: 0.15,
	})

	const boxHelper = new Mesh(boxGeometry, matcapMaterial)
	boxHelper.name = "transparent"
	boxHelper.visible = false
	boxHelper.position.set(0, isTop ? height / 2 : 0, 0)


	const edges = new EdgesGeometry(boxHelper.geometry)
	const line = new LineSegments(edges, new LineBasicMaterial({ color: 0x0099DC }))

	line.name = "edges"
	line.visible = false
	line.position.set(0, isTop ? height / 2 - constants.sideDepth : 0, 0)

	boxGeometry.dispose()
	edges.dispose()
	matcapMaterial.dispose()

	return {
		boxHelper,
		line
	}
}
