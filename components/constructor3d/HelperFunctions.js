import * as THREE from 'three'
import boxes from "./models/boxes/BoxesList";

const {Math: threeMath} = THREE

const animationFromTo = () => {

  const xAxis = new THREE.Vector3(1, 0, 0);
  const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0);
  const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI);
  const quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', [0, 1, 2], [qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w]);
  //
  const clip = new THREE.AnimationClip('Action', 3, [quaternionKF]);
  let mixer = new THREE.AnimationMixer(this.scene);
  //
  const clipAction = mixer.clipAction(clip);
  clipAction.play();
  mixer.update()

}

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
  if (parent && parent.visible && parent.userData && parent.userData.actionName) return parent.userData.actionName
  else return findActionName(parent)
}

const rotationY = (obj) => {
  obj.rotation.y = threeMath.degToRad(-90);
  return obj
}

const setCasesPosition = (boxes) => {
  const places = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight']
  const groupBy = (list, key) => {
    return list.reduce(function (acc, el) {
      if (places.includes(el['userData'][key])) {
        (acc[el['userData'][key]] = acc[el['userData'][key]] || []).push(el)
      }
      return acc
    }, {})
  }
  const groupedBoxes = groupBy(boxes, 'type')

  const getPaddingBySort = (arr, elSort, elWidth, padding) => {
    return arr.reduce((acc, {userData: {sort, width}}) => {
      if (elSort > sort) acc += width
      return acc
    }, 0) + elWidth / 2 + padding
  }

  const wallPadding = 0.6
  const angularPadding = 2

  if (groupedBoxes.bottomLeft) {
    const padding = groupedBoxes.bottomRight && groupedBoxes.bottomRight[0]['userData']['depth'] || 0
    const angularBox = groupedBoxes.bottomLeft.find(({userData: {configType}}) => configType === 'angularBox')

    groupedBoxes.bottomLeft.forEach((el) => {
      const {userData: {sort, width, depth}} = el
      el.position.x = -getPaddingBySort(groupedBoxes.bottomLeft, sort, width, angularBox ? wallPadding + angularPadding : padding + wallPadding)
      el.position.z = depth / 2 + wallPadding
    })

  }

  if (groupedBoxes.bottomRight) {
    const padding = groupedBoxes.bottomLeft && groupedBoxes.bottomLeft[0]['userData']['depth'] || 0
    const angularBox = groupedBoxes.bottomRight.find(({userData: {configType}}) => configType === 'angularBox')

    groupedBoxes.bottomRight.forEach((el) => {
      const {userData: {sort, width, depth}} = el
      el.position.z = getPaddingBySort(groupedBoxes.bottomRight, sort, width, angularBox ? wallPadding + angularPadding : padding + wallPadding)
      el.position.x = -(depth / 2 + wallPadding)
    })
  }

  if (groupedBoxes.topLeft) {
    const padding = groupedBoxes.topRight && groupedBoxes.topRight[0]['userData']['depth'] || 0
    const angularBox = groupedBoxes.topLeft.find(({userData: {configType}}) => configType === 'angularBox')

    groupedBoxes.topLeft.forEach((el) => {
      const {userData: {sort, width, depth }} = el
      el.position.x = -getPaddingBySort(groupedBoxes.topLeft, sort, width, angularBox ? 0 : padding)
      el.position.z = depth / 2
    })
  }

  if (groupedBoxes.topRight) {
    const padding = groupedBoxes.topLeft && groupedBoxes.topLeft[0]['userData']['depth'] || 0
    const angularBox = groupedBoxes.topRight.find(({userData: {configType}}) => configType === 'angularBox')

    groupedBoxes.topRight.forEach((el) => {
      const {userData: {sort, width, depth }} = el
      el.position.z = getPaddingBySort(groupedBoxes.topRight, sort, width, angularBox ? 0 : padding)
      el.position.x = -(depth / 2)
    })
  }
}

const getPlaceWidth = (arr, additionalArr) => {
  let padding = 0
  if (additionalArr) {
    padding = additionalArr[0]['userData']['depth']
  }
  if (!arr) return padding
  let width = arr.reduce((acc, {userData: {width}}) => {
    acc += width
    return acc
  }, 0)

  return width + padding
}
const getFacadeGroup = (obj) => {
  if (!obj) return null
  const caseGroup = obj.children.find(({name}) => name === 'caseGroup')
  if (caseGroup) {
    const facade = caseGroup.children.find(({name}) => name === 'facade')
    if (facade) return facade
  }

  return null
}

const getAddMethodName = (arrAddMethods, val) => {
  const name = arrAddMethods.find(el => el.toLowerCase().indexOf(val.toLowerCase()) > -1)
  return name ? name : ''
}

const getTableTops = (arr) => {
  let tableTop = {
    width: 0,
    side: '',
    x: 0,
    z: 0
  }
  let itemsCount = 0
  let counter = 0
  let padding = 0
  return arr.reduce((acc, el) => {
    itemsCount++
    const {side, width, sort, x, z} = el
    if (itemsCount === 1) {
      counter = sort
      padding = side === 'left' ? (sort === 0 ? x + 0.6 : x) + width / 2 :  (sort === 0 ? z - 0.6 : z) - width / 2
    }
    tableTop.side = side

    if (counter !== sort) {
      acc.push({...tableTop})
      tableTop.width = width
      padding = side === 'left' ? x + width / 2 : z - width / 2
      tableTop.x = side === 'left' ? padding - width / 2 : x
      tableTop.z = side === 'left' ? z : padding + width / 2
      counter = sort
      counter++

    } else {
      tableTop.width += (sort === 0 ? width + 0.6 : width)
      tableTop.x = side === 'left' ? padding - tableTop.width / 2 : x
      tableTop.z = side === 'left' ? z : padding + tableTop.width / 2
      counter++
    }
    if (arr.length === itemsCount) {
      if (width !== 0) {
        tableTop.width += 0.02
        tableTop.x += side === 'left' ? -0.01 : 0
        tableTop.z += side === 'left' ? 0 : 0.01
      }
      acc.push({...tableTop})
    }
    return acc
  }, [])
}

export default {
  fromTo,
  camPos,
  recursiveFindBox,
  findActionName,
  setCasesPosition,
  rotationY,
  getPlaceWidth,
  getFacadeGroup,
  getAddMethodName,
  getTableTops
}
