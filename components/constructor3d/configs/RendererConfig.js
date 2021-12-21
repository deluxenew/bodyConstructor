import { WebGLRenderer } from 'three'

const options = {
  alpha: true,
  antialias: true,
}

const renderer = () => {
  const commonRenderer = new WebGLRenderer(options)
  commonRenderer.shadowMap.enabled = true
  return commonRenderer
}

export default {
  renderer
}
