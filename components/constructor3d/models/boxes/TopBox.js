import { boxWrapper } from "../BoxWrapper"

export const topBox = (width, height, depth) => {
  const boxWrap = boxWrapper(width, height, depth)
  boxWrap.userData['pos'] = 'top'
  return boxWrap
}
