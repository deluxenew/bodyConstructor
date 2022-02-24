import { BoxGeometry, CubeTextureLoader,  Mesh, MeshStandardMaterial, EquirectangularReflectionMapping, sRGBEncoding, MeshLambertMaterial, MeshBasicMaterial, TextureLoader, Math, Vector2 } from "three"
import HF from "../HelperFunctions"
import { constants } from "./boxes/constants"

const { textureScale } = HF

const defaultMaterial = () => {
	const material = new MeshStandardMaterial({
		color: 0xffffff,
	})
	return material
}
const metalMaterial = () => {
	const material = new MeshStandardMaterial({ color: 0xffffff })
	material.roughness = 0.1
	material.metalness = 0.5
	return material
}
const darkMaterial = () => {
	const material = new MeshStandardMaterial({ color: 0x0f0f0f })
	material.roughness = 1
	material.metalness = 0
	return material
}
const textureMaterial = (url, width, height) => {

	const texture = textureScale(url, width, constants.tableTopDepth, constants.textureScale, true)

	const facadeMaterial = new MeshStandardMaterial({
		color: 0xffffff,
		map: texture,
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

const textureMappedMaterial = ({ loadedMap, loadedTexture, width, height, sideDepth, mirror }) => {
	const geometry = new BoxGeometry(width, height, sideDepth, 64,64)
	const wallTextureLoader = new TextureLoader()
	const wallNormalTexture = wallTextureLoader.load(loadedMap)
	const textureEquirec = wallTextureLoader.load(require("../img/eq1.jpg"));

	/*const loader = new CubeTextureLoader();
	let textureCube
	//loader.setPath( '../img/' );
	textureCube = loader.load( [ require("../img/mmW.png"), require("../img/mmW.png"), require("../img/mmF.png"), require("../img/mmF.png"), require("../img/mmW.png"), require("../img/mmW.png") ] );
	//textureCube.encoding = sRGBEncoding;*/
	textureEquirec.mapping = EquirectangularReflectionMapping;
	//textureEquirec.encoding = sRGBEncoding;
	textureEquirec.center = new Vector2(0, 10)
	textureEquirec.flipY


	let wallMaterial
	wallMaterial = new MeshLambertMaterial({
		color: 0xeeeeee,
		envMap: textureEquirec,
	})
	wallMaterial.needsUpdate = true;

	if (loadedMap) wallMaterial.normalMap = wallNormalTexture
		
	const facadeMaterials = [
		defaultMaterial(),
		
		defaultMaterial(),

		defaultMaterial(),
		
		defaultMaterial(),
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
	metalMaterial,
	darkMaterial,
}
