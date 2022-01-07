import {
	BoxGeometry, Mesh, MeshStandardMaterial, Group, TextureLoader,
} from "three"

const depth = 6
// const material = new MeshStandardMaterial({color: 0x000000,});

const getMaterial = (url) => {
	const facadeTextureLoader = new TextureLoader()
	const facadeMaterial = new MeshStandardMaterial({
		color: 0xffffff,
		map: facadeTextureLoader.load(url),
	})

	const material = new MeshStandardMaterial({ color: 0xffffff })

	material.roughness = 0.3
	material.metalness = 0.05

	const facadeMaterials = [
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		material,
	]

	facadeMaterial.dispose()
	material.dispose()

	return facadeMaterials
}

const getMaxWidth = (type) => {
	switch (type) {
		case "post": return 30
		case "ldsp": return 27
	}
}

const getTableTop = ({
	width, height, type, url,
}) => {
	const tableTopBox = new BoxGeometry(width, height, depth)
	const tableTop = new Mesh(tableTopBox, getMaterial(url))
	tableTop.castShadow = true
	tableTop.receiveShadow = true
	tableTop.name = "tableTop"

	const tableTopGroup = new Group()

	tableTopGroup.add(tableTop)

	tableTopGroup.userData.type = "tableTop"
	tableTopGroup.userData.width = width
	tableTopGroup.userData.height = height
	tableTopGroup.userData.depth = depth
	tableTopGroup.userData.maxWidth = getMaxWidth(type)

	// tableTopGroup.position.set(-depth / 2, paddingBottom + height / 2, width / 2 )

	tableTopBox.dispose()

	return tableTopGroup
}

export default {
	getTableTop,
}
