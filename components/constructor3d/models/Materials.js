import { MeshStandardMaterial, TextureLoader } from "three"

const defaultMaterial = () => {
	const material = new MeshStandardMaterial({
		color: 0xffffff,
	})
	return material
}

const textureMaterial = (url) => {
	const facadeTextureLoader = new TextureLoader()

	const facadeMaterial = new MeshStandardMaterial({
		color: 0xffffff,
		map: facadeTextureLoader.load(url),
	})

	const defaultTexture = defaultMaterial()

	const facadeMaterials = [
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		facadeMaterial,
		defaultTexture,
	]

	facadeMaterial.dispose()
	defaultTexture.dispose()

	return facadeMaterials
}

const legMaterial = () => {
	const leg = new MeshStandardMaterial({ color: 0xffffff })
	leg.roughness = 0.1
	leg.metalness = 0.5
	return leg
}

export default {
	defaultMaterial,
	textureMaterial,
	legMaterial,
}
