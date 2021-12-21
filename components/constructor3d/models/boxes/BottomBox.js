import { boxWrapper } from "./BoxWrapper"

export const bottomBox = (width, height, depth) => {
  const boxWrap = boxWrapper(width, height, depth)
  boxWrap.userData['pos'] = 'bottom'
  return boxWrap
}

