import RendererConfig from "./configs/Renderer"
import CameraConfig from "./configs/Camera"
import LightConfig from "./configs/Light"
import SceneConfig from "./configs/Scene"
import ControlsConfig from "./configs/Controls"
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
	controlBoxes,
}
