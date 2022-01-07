import {
	ShapeGeometry, MeshBasicMaterial, DoubleSide, Group, Mesh,
} from "three"

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { GetArrows } from "./Arrows"

export const GetTextMesh = (text, width) => {
	const textObj = new Group()
	const loader = new FontLoader()

	loader.load("./helvetiker_regular.typeface.json", (font) => {
		const color = 0x000000

		const matLite = new MeshBasicMaterial({
			color,
			transparent: true,
			opacity: 0.6,
			side: DoubleSide,
		})

		const shapes = font.generateShapes(text, 0.5)
		const geometry = new ShapeGeometry(shapes)
		geometry.computeBoundingBox()
		const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
		geometry.translate(xMid, 0, 0)

		const textMesh = new Mesh(geometry, matLite)
		textMesh.position.y = 0.3
		textObj.add(textMesh)
		matLite.dispose()
		geometry.dispose()
	})

	const arrows = GetArrows(width)
	textObj.add(arrows)

	return textObj
}