import {
	PlaneGeometry, MeshStandardMaterial, TextureLoader, Mesh, RepeatWrapping, Math,
} from "three"

import HF from "../HelperFunctions"

const { textureScale } = HF

const wallWidth = 60 * 2
const wallHeight = 40

const wallGeometry = new PlaneGeometry(wallWidth, wallHeight)
const floorGeometry = new PlaneGeometry(wallWidth, wallWidth)

const texture1 = textureScale(require("../img/mm1.png"), wallWidth, wallWidth, 1, false)
texture1.wrapS = RepeatWrapping
texture1.wrapT = RepeatWrapping

const floorMaterial = new MeshStandardMaterial({
	color: 0xffffff/* 0xd2b8a3/* af9182 */,
	map: texture1
})
floorMaterial.roughness = 0.8
floorMaterial.metalness = 0.1
const floorTextureLoader = new TextureLoader()
const wallTextureLoader = new TextureLoader()

const wallNormalTexture = wallTextureLoader.load(require("../img/wall.jpg"))
const floorNormalTexture = floorTextureLoader.load(require("../img/floor.jpg"))

const texture = textureScale(require("../img/mm.png"), wallWidth, wallHeight, 1, false)
texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping

const wallMaterial = new MeshStandardMaterial({
	color: 0xffffff/*0xffedde/* c8b7ae */,
	map: texture
})
wallMaterial.roughness = 1
wallMaterial.metalness = 0.2
wallMaterial.normalMap = wallNormalTexture

floorMaterial.normalMap = floorNormalTexture

const wall = new Mesh(wallGeometry, wallMaterial)
const wallR = new Mesh(wallGeometry, wallMaterial)
const floor = new Mesh(floorGeometry, floorMaterial)

floor.receiveShadow = true
wallR.receiveShadow = true
wall.receiveShadow = true

wall.material.normalMap.repeat.set(8 * 2, 4 * 2)
wall.material.needsUpdate = true
wallR.material.normalMap.repeat.set(4 * 2, 8 * 2)
wallR.material.needsUpdate = true
wall.material.normalMap.wrapS = wall.material.normalMap.wrapT = RepeatWrapping
wallR.material.normalMap.wrapS = wallR.material.normalMap.wrapT = RepeatWrapping
wall.name = "wall"

wallR.name = "wallR"

floor.material.normalMap.repeat.set(3 * 2, 3 * 2)
floor.material.needsUpdate = true
floor.material.normalMap.wrapS = floor.material.normalMap.wrapT = RepeatWrapping

wall.position.set(-wallWidth / 2, wallHeight / 2, 0)
wallR.position.set(0, wallHeight / 2, wallWidth / 2)
floor.position.set(-wallWidth / 2, 0, wallWidth / 2)
wallR.rotation.y = Math.degToRad(-90)
floor.rotation.x = Math.degToRad(-90)

wallGeometry.dispose()
floorGeometry.dispose()
floorMaterial.dispose()
wallNormalTexture.dispose()
floorNormalTexture.dispose()
wallMaterial.dispose()

const walls = [floor, wallR, wall]

export default {
	walls,
}
