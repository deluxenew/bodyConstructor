import { PerspectiveCamera } from "three"

const FOV = 45
const FAR = 200

const camera = (width, height) => {
	const pCamera = new PerspectiveCamera(FOV, width / height, 1, FAR)
	pCamera.position.z = 80
	pCamera.position.y = 13
	return pCamera
}

export default {
	camera,
}
