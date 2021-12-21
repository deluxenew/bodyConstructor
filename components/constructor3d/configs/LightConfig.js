import { SpotLight, PointLight } from 'three'

const COLOR = 0xffffff

const spotLight = () => {
  const spotLight = new SpotLight(COLOR);
  const n = 2;
  spotLight.position.set(-60 * n, 55 * n, 60 * n);
  spotLight.target.position.set(-10, 10, 10);
  spotLight.intensity = 0.6
  return spotLight
}

export default {
  spotLight
}
