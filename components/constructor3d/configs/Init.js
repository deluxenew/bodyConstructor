import RendererConfig from "./Renderer"
import CameraConfig from "./Camera"
import LightConfig from "./Light"
import SceneConfig from "./Scene"
import ControlsConfig from "./Controls"
import Walls from "./Walls"

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
