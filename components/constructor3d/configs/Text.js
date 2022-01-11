import {
	ShapeGeometry, MeshBasicMaterial, DoubleSide, Group, Mesh,
} from "three"

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"

export const GetTextMesh = (text) => {
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
		textObj.add(textMesh)
		textMesh.position.y = 0.3

		matLite.dispose()
		geometry.dispose()
	})

	textObj.name = 'text'
	// textObj.visible	= false

	return textObj
}
