import { SpotLight, PointLight } from 'three'

const COLOR = 0xffffff
const n = 2;

const spotLight = () => {
  const spotLight = new SpotLight(COLOR);
  spotLight.position.set(-60 * n, 55 * n, 60 * n);
  spotLight.target.position.set(-10, 10, 10);
  spotLight.intensity = 0.6
  return spotLight
}

const spotLight_1 = () => {
  const spotLight = new PointLight(0xffffff);
  spotLight.position.set(-20, 10, 20);
  spotLight.intensity = 0.2
  return spotLight
}

const spotLight_2 = () => {
  const spotLight = new PointLight(0xffffff);
  spotLight.position.set(-80, 10, 5);
  spotLight.intensity = 0.2
  return spotLight
}

const spotLight_3 = () => {
  const spotLight = new PointLight(0xffffff);
  spotLight.position.set(-5, 10, 80);
  spotLight.intensity = 0.2
  return spotLight
}


const spotLight_4 = () => {
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(0, 0, 0);
  spotLight.target.position.set(-60 * n, 55 * n, 60 * n);
  spotLight.intensity = 0.6
  return spotLight
}

const spotLights = [
  spotLight(),
  spotLight_1(),
  spotLight_2(),
  spotLight_3(),
  spotLight_4()
]

export default {
  spotLights
}
