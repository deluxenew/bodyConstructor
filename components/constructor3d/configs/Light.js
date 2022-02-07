import { SpotLight, PointLight } from "three"

const COLOR = 0xffffff
const n = 2

const spotLight = () => {
	const spotLight = new SpotLight(COLOR)
	spotLight.position.set(-60 * n, 55 * n, 60 * n)
	spotLight.target.position.set(-10, 10, 10)
	spotLight.intensity = 1

	return spotLight
}

const spotLight_1 = () => {
	const spotLight = new PointLight(0xffffff)
	spotLight.position.set(-20, 10, 20)
	spotLight.intensity = 0.2

	return spotLight
}

const spotLight_2 = () => {
	const spotLight = new SpotLight(0xffffff)
	spotLight.target.position.set(-1, 55, 1)
	spotLight.position.set(-20, -55, 20)
	spotLight.intensity = 0.3

	return spotLight
}

const spotLight_3 = () => {
	const spotLight = new PointLight(0xffffff)
	spotLight.position.set(-20, 10, -1)
	spotLight.intensity = 0.2

	return spotLight
}

const spotLight_4 = () => {
	const spotLight = new PointLight(0xffffff)
	spotLight.position.set(-20, 30, 20)
	// spotLight.target.position.set(-60 * n, 55 * n, 60 * n);
	spotLight.intensity = 0.1

	const res = 256 * 2 
	// spotLight.shadow.bias = -0.0001;
	spotLight.shadow.bias = 0
	spotLight.shadow.mapSize.width = res
	spotLight.shadow.mapSize.height = res
	spotLight.shadow.radius = 8
	spotLight.castShadow = true

	return spotLight
}

const spotLight_5 = () => {
	const spotLight = new PointLight(0xffffff)
	spotLight.position.set(-10, 30, 30)
	// spotLight.target.position.set(-60 * n, 55 * n, 60 * n);
	spotLight.intensity = 0.2
	return spotLight
}

const spotLights = [
	spotLight(),
	spotLight_1(),
	spotLight_2(),
	spotLight_3(),
	spotLight_4(),
	// spotLight_5()
]

export default {
	spotLights,
}
