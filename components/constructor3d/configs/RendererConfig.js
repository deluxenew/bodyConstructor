import { WebGLRenderer } from 'three'

const options = {
  alpha: true,
  antialias: true,
}

const renderer = (width, height) => {
  const commonRenderer = new WebGLRenderer(options)
  commonRenderer.shadowMap.enabled = true
  commonRenderer.setSize(width, height);
  return commonRenderer
}

export default {
  renderer
}
