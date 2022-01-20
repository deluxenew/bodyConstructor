import { BoxGeometry, Mesh, MeshStandardMaterial, TextureLoader } from "three"
import HF from "../HelperFunctions"

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

const textureMappedMaterial = ({ loadedMap, loadedTexture, width, height, sideDepth }) => {
	const geometry = new BoxGeometry(width, height, sideDepth)
	const wallTextureLoader = new TextureLoader()
	const wallNormalTexture = wallTextureLoader.load(loadedMap)
	const wallMaterial = new MeshStandardMaterial({
		color: 0xffedde,
		map: wallTextureLoader.load(loadedTexture)
	})

	wallMaterial.roughness = 1
	wallMaterial.metalness = 0.2
	if (loadedMap) wallMaterial.normalMap = wallNormalTexture

	const facadeMaterials = [
		wallMaterial,
		wallMaterial,
		wallMaterial,
		wallMaterial,
		wallMaterial,
		defaultMaterial(),
	]

	const wall = new Mesh(geometry, facadeMaterials)
	wall.receiveShadow = true
	if (loadedMap) {
		wall.material.forEach((el) => {
			if (el.normalMap && el.normalMap.repeat) el.normalMap.repeat.set(8 * 2, 4 * 2)
			el.needsUpdate = true
		})
	}
	wall.name = "texture"

	return wall
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
	textureMappedMaterial,
	legMaterial,
}
