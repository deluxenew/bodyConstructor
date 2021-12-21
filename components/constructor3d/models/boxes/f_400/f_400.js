import { bottomBox } from "../bottomBox"

const width = 4
const height = 8.2
const depth = 4.8

const scale = 3

export const f_400 = () => {
  const box = bottomBox(width, height, depth)
  box.name = 'f-400'
  box.userData['facadeVariants'] = ['f-400-1']
  box.scale.set( scale, scale, scale )
  return box
}

