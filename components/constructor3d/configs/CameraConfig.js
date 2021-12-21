import { PerspectiveCamera } from 'three'

const FOV = 45
const FAR = 200

const camera =  ({ canvasWidth, canvasHeight }) => {
  return new PerspectiveCamera(FOV, canvasWidth / canvasHeight, 1, FAR)
}

export default {
  camera
}
