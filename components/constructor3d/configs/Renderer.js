import { PCFSoftShadowMap, WebGLRenderer, sRGBEncoding } from "three"

const options = {
	alpha: true,
	antialias: true,
}

const renderer = (width, height) => {
	const commonRenderer = new WebGLRenderer(options)
	commonRenderer.shadowMap.enabled = true
	commonRenderer.shadowMapSoft = true
	commonRenderer.shadowMap.type = PCFSoftShadowMap
	commonRenderer.setSize(width, height)

	//commonRenderer.outputEncoding = sRGBEncoding;
	return commonRenderer
}

export default {
	renderer,
}
