import { Scene, Math } from 'three'

const scene = () => {
  const sceneAll = new Scene()
  sceneAll.rotation.y = Math.degToRad(45);
  return sceneAll
}

export default {
  scene
}
