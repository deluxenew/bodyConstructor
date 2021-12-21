import RendererConfig from './configs/RendererConfig'
import CameraConfig from'./configs/CameraConfig'
import LightConfig from'./configs/LightConfig'
import SceneConfig from'./configs/SceneConfig'
import ControlsConfig from'./configs/ControlsConfig'
import Walls from "./models/Walls"

const { renderer } = RendererConfig
const { camera } = CameraConfig
const { spotLights } = LightConfig
const { scene } = SceneConfig
const { walls } = Walls
const { controlBoxes } = ControlsConfig

export default {
  renderer,
  camera,
  spotLights,
  scene,
  walls,
  controlBoxes
}
