import RendererConfig from './configs/RendererConfig'
import CameraConfig from'./configs/CameraConfig'
import LightConfig from'./configs/LightConfig'
import SceneConfig from'./configs/SceneConfig'

const { renderer } = RendererConfig
const { camera } = CameraConfig
const { spotLight } = LightConfig
const { scene } = SceneConfig

export default {
  renderer,
  camera,
  spotLight,
  scene
}
