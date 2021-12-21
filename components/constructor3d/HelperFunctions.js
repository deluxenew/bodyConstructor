import * as THREE from 'three'
import boxes from "@/components/constructor3d/CasesListConfig";
const { Math: threeMath } = THREE

const fromTo = (value, from, to, steps) => {
  let step = 0;
  if (value === to) return value;
  if (from < to) {
    if (value < to) {
      step = (to - from) / steps;
      if (value + step < to) {
        return value + step;
      } else {
        return to;
      }
    }
  } else if (from > to) {
    if (value > to) {
      step = (from - to) / steps;
      if (value - step > to) {
        return value - step;

      } else {
        return to;
      }
    }
  }
}

const camPos = (position, wrb, wlb, wrt, wlt) => {
  function povSet(wL, wR, camAngle, camZ, pos) {
    wL += 3
    wR += 3
    switch (pos) {
      case 1: {
        wL += 3
        wR += 3
        break
      }
      case 2: {
        wL = 3
        break
      }
      case 3: {
        wR = 3
        break
      }
    }
    const heightForCam = 20
    let alfa = Math.atan(wL / wR);
    let g = Math.sqrt(Math.pow(wL, 2) + Math.pow(wR, 2));
    let a = Math.pow(wL, 2) / g;
    let b = g - a;
    let h = Math.sqrt(a * b);
    let h2 = Math.tan(threeMath.degToRad(90 - camAngle / 2)) * g / 2 + h / 2;

    let cPz = 0;
    if (h2 > camZ) {
      cPz = h2;
    } else {
      cPz = camZ;
    }

    return {
      x: threeMath.degToRad(45 * 2) - Math.atan(Math.sqrt(Math.pow(h2 + h, 2) + Math.pow(heightForCam, 2)) / (h2 + h)) * 2 /*- threeMath.degToRad(18) */,
      y: threeMath.degToRad(90) - alfa,
      sPx: (a - b) / 2,
      cPz: cPz,
    };
  }

  const wr = Math.max(wrb, wrt)
  const wl = Math.max(wlb, wlt)

  const cameraPositions = {
    pos1: povSet(wl, wr, 45, 50, position),
    pos2: povSet(wl, wr, 45, 50, position),
    pos3: povSet(wl, wr, 45, 50, position)
  }
  return cameraPositions[`pos${position}`]
}

const recursiveFindBox = (obj) => {
  if (!obj || !obj.parent) return null
  const parent = obj.parent
  if ([...new Set(Object.keys(boxes))].includes(parent.name)) return parent
  else return recursiveFindBox(parent)
}

const findActionName = (obj) => {
  if (!obj || !obj.parent) return null
  const parent = obj.parent
  if (parent && parent.userData && parent.userData.actionName) return parent.userData.actionName
  else return findActionName(parent)
}

export default {
  fromTo,
  camPos,
  recursiveFindBox,
  findActionName
}
