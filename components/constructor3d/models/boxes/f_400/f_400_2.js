import { f_400 } from "./f_400"

export const f_400_2 = () => {
  const box = f_400()
  box.name = 'f-400-2'
  box.userData['parentBoxName'] = 'f-400'
  return box
}


