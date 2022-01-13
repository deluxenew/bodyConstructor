import { PerspectiveCamera } from "three"
import { constants } from "./boxes/constants"

const FOV = constants.camAngle
const FAR = 200

const camera = (width, height) => {
	const pCamera = new PerspectiveCamera(FOV, width / height, 1, FAR)
	pCamera.position.z = constants.camPositionZ + 20
	pCamera.position.y = constants.camPositionY
	return pCamera
}

export default {
	camera,
}
