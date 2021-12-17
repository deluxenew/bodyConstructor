<template lang="pug">
  div
    div.canvas(ref="canvas")
      div.controls
        div.button.camera(@click="swapCam")
          img(:src="require('./img/eye.svg')")
          div.camera__variants
            div.item(v-for="item in 3")
              svg(width="7" height="4" viewBox="0 0 7 4" fill="none")
                path(d="M0 2C0 0.895431 0.89543 0 2 0H4.66667C5.77124 0 6.66667 0.895431 6.66667 2C6.66667 3.10457 5.77124 4 4.66667 4H2C0.895429 4 0 3.10457 0 2Z" :fill="item <= positionNumber ? '#5C6270' : '#E3E5E8'")
        div.box-control
          button.button.left(:disabled="!selectedCase || !isMoveLeftActive || isAngularIsSelected" @click="moveLeft")
            img(:src="require('./img/arrow.svg')")
          button.button.right(:disabled="!selectedCase || !isMoveRightActive || isAngularIsSelected" @click="moveRight")
            img(:src="require('./img/arrow.svg')")
          button.button.open(:disabled="!selectedCase" @click="openDoors")
            img(:src="require('./img/doors.svg')")
          button.button.remove(:disabled="!selectedCase" @click="removeCase")
            img(:src="require('./img/trash.svg')")
</template>



<script>
  import * as Three from 'three'

  const {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    MeshStandardMaterial,
    TextureLoader,
    Mesh,
    RepeatWrapping,
    Math: threeMath,
    RectAreaLight,
    SpotLight,
    PointLight,
    Vector2,
    Raycaster,
    // BufferGeometry,
    // Line,
    // ShapeGeometry,
    // LineBasicMaterial,
    // MeshBasicMaterial,
    // DoubleSide,
    // Object3D
  } = Three
  // import {FontLoader} from "./FontLoader.js";
  // import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

  const windows = {innerHeight: 600, innerWidth: 800}

  let LEGS_HEIGHT = 1;
  let GAP_FACADE = 0.1;
  let SIDE_DEPTH = .3;
  let TABLE_TOP_DEPTH = 7
  let TABLE_TOP_PADDING_BOTTOM = 10
  let GAP_FROM_WALL = SIDE_DEPTH;

  import controls from './ControlBoxConfig.js'

  const {boxControl} = controls

  import boxes from './CasesListConfig.js'

  const {boxAngularFloor,} = boxes

  import tableTop from './TableTopList.js'

  const {getTableTop} = tableTop

  import select from './SelectConfig'

  const {selectBox} = select

  export default {
    props: {
      caseConfig: {
        type: Object,
        default: () => {
        }
      },
      tableTopConfig: {
        type: Object,
        default: () => ({
          showTableTop: true,
          type: 'post',
          height: 0.26,
          maxWidth: 30,
          url: '',
          color: ''
        })
      },
      value: {
        type: Object,
        default: () => ({
          currentConfig: {
            caseConfig: {
              name: ''
            },
            facadeConfig: {
              name: '',
              type: '',
              variant: '',
              colorId: ''
            },
            tableTopConfig: {
              showTableTop: true,
              type: 'post',
              height: 0.26,
              maxWidth: 30,
              colorId: '',
              url: ''
            },
          },
          order: {
            cases: [],
            facades: [],
            tableTops: []
          }
        })
      }
    },
    data() {
      return {
        renderer: new WebGLRenderer({
          alpha: true,
          antialias: true,
        }),
        positionNumber: 1,
        selectedCase: null,
        showSizes: false,
        scene: new Scene(),
        camera: new PerspectiveCamera(45, 800 / 600, 1, 200),
      }
    },
    computed: {
      caseConfigModel: {
        get() {
          return this.caseConfig || null
        },
        set(v) {
          let kitchen = this.value
          if (kitchen && kitchen.currentConfig && kitchen.currentConfig) {
            kitchen.currentConfig.caseConfig.name = v ? v.name : ''
            kitchen.currentConfig.facadeConfig.name = v ? v.name : ''
            if (v) {
              const {userData: {facadeColorId, facadeType, facadeVariantType}} = v
              kitchen.currentConfig.facadeConfig.colorId = facadeColorId
              kitchen.currentConfig.facadeConfig.type = facadeType
              kitchen.currentConfig.facadeConfig.variant = facadeVariantType
            }

            this.$emit('input', kitchen)
          }
        },
      },

      bottomRight() {
        return this.scene.children
            .filter(({name, place}) => [...Object.keys(boxes)].includes(name) && place === 'bottomRight')
            .sort((a, b) => {
              if (a.userData.sort > b.userData.sort) return 1
              if (a.userData.sort < b.userData.sort) return -1
              return 0
            })
      },
      bottomRightWhiteoutAngular() {
        return this.scene.children.filter(({name, place}) => !['boxAngularFloor', 'boxAngularFloor_1'].includes(name) && place === 'bottomRight')
            .sort((a, b) => {
              if (a.userData.sort > b.userData.sort) return 1
              if (a.userData.sort < b.userData.sort) return -1  
              return 0
            })
      },
      bottomLeft() {
        return this.scene.children.filter(({name, place}) => [...Object.keys(boxes)].includes(name) && place === 'bottomLeft')
            .sort((a, b) => {
              if (a.userData.sort > b.userData.sort) return 1
              if (a.userData.sort < b.userData.sort) return -1
              return 0
            })
      },
      bottomAngularCaseExist() {
        const angular = this.bottomRight.find(({name, place}) => ['boxAngularFloor', 'boxAngularFloor_1'].includes(name) && place === 'bottomRight')
        return angular ? angular.userData : null
      },
      bottomPaddingRight() {
        const angularPadding = this.bottomRight[0]?.userData?.padding || 0
        const paddingLeft = this.bottomLeft.length ? this.bottomLeft[0].userData.depth : 0
        const paddingCases = this.bottomRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width, padding}} = el
            if (padding) acc += padding
            acc += width
          }
          return acc
        }, 0)
        return paddingCases + (angularPadding ? angularPadding : paddingLeft)
      },
      bottomPaddingLeft() {
        const paddingLeft = this.bottomLeft.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 0)
        return paddingLeft
      },
      topRight() {
        return this.scene.children.filter(({place}) => place === 'topRight')
            .sort((a, b) => {
              if (a.userData.sort > b.userData.sort) return 1
              if (a.userData.sort < b.userData.sort) return -1
              return 0
            })
      },
      topLeft() {
        return this.scene.children.filter(({place}) => place === 'topLeft')
            .sort((a, b) => {
              if (a.userData.sort > b.userData.sort) return 1
              if (a.userData.sort < b.userData.sort) return -1
              return 0
            })
      },
      topPaddingRight() {
        const angularPadding = this.topRight[0]?.userData?.padding || 0
        const paddingLeft = this.topLeft.length ? this.topLeft[0].userData.depth : 0
        const paddingCases = this.topRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width, padding}} = el
            if (padding) acc += padding
            acc += width
          }
          return acc
        }, 0)
        return paddingCases + (angularPadding ? angularPadding : paddingLeft)
      },
      topPaddingLeft() {
        const paddingLeft = this.topLeft.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 0)
        return paddingLeft
      },
      tableTopsRight() {
        return this.scene.children.filter(({name}) => name === 'tableTopRight')
      },
      tableTopsLeft() {
        return this.scene.children.filter(({name}) => name === 'tableTopLeft')
      },
      camPos() {
        const vm = this

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
          //vm.camera.rotation.x = threeMath.degToRad(45*2) - Math.atan(Math.sqrt(Math.pow(h2 + h,2) + Math.pow(heightForCam, 2)) / (h2 + h))*2 /*- threeMath.degToRad(18) */;
          vm.camera.position.y = 14;
          //vm.scene.rotation.y = threeMath.degToRad(90) - alfa;
          //vm.scene.position.x = (a - b) /2;
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

        const wrb = vm.bottomRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 10)

        const wlb = vm.bottomLeft.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 10)

        const wrt = vm.topRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 10)

        const wlt = vm.topLeft.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 10)

        const wr = Math.max(wrb, wrt)
        const wl = Math.max(wlb, wlt)


        const cameraPositions = {
          pos1: povSet(wl, wr, 45, 50, this.positionNumber),
          pos2: povSet(wl, wr, 45, 50, this.positionNumber),
          pos3: povSet(wl, wr, 45, 50, this.positionNumber)
        }
        return cameraPositions[`pos${this.positionNumber}`]
      },
      bodyCase() {
        return this.caseConfig
      },
      addBottomRightButton() {
        let addBottomRightButton = boxControl.clone()
        addBottomRightButton.name = 'addBottomRightButton'
        addBottomRightButton.rotation.y = threeMath.degToRad(-90);
        addBottomRightButton.userData.actionName = 'addBottomRightToScene'
        return addBottomRightButton
      },
      addBottomLeftButton() {
        let addBottomLeftButton = boxControl.clone()
        addBottomLeftButton.name = 'addBottomLeftButton'
        addBottomLeftButton.userData.actionName = 'addBottomLeftToScene'
        return addBottomLeftButton
      },
      addTopRightButton() {
        let addTopRightButton = boxControl.clone()
        addTopRightButton.name = 'addTopRightButton'
        addTopRightButton.rotation.y = threeMath.degToRad(-90);
        addTopRightButton.userData.actionName = 'addTopRightToScene'

        return addTopRightButton
      },
      addTopLeftButton() {
        let addTopLeftButton = boxControl.clone()
        addTopLeftButton.name = 'addTopLeftButton'
        addTopLeftButton.userData.actionName = 'addTopLeftToScene'
        return addTopLeftButton
      },
      isMoveRightActive() {
        const currentUuid = this.selectedCase?.uuid
        if (!currentUuid) return false
        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
        const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentUuid)
        return (leftIdx > 0 && this.bottomLeft.length > 1)
            || (rightIdx > -1 && rightIdx < this.bottomRight.length - 1 && this.bottomRight.length > 1)
      },
      isMoveLeftActive() {
        const currentUuid = this.selectedCase?.uuid
        if (!currentUuid) return false
        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
        const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentUuid)
        return (rightIdx > 0 && this.bottomRight.length > 1)
            || (leftIdx > -1 && leftIdx < this.bottomLeft.length - 1 && this.bottomLeft.length > 1)
      },
      isAngularIsSelected() {
        return ['boxAngularFloor', 'boxAngularFloor_1'].includes(this.selectedCase?.name)
      },
      isMaxRightPadding() {
        return this.bottomPaddingRight > 42
      },
      isMaxLeftPadding() {
        return this.bottomPaddingLeft > 40
      },
      isMaxRightTopPadding() {
        return this.topPaddingRight > 42
      },
      isMaxLeftTopPadding() {
        return this.topPaddingRight > 40
      },
      paddingTableTopRight() {
        const paddingLeft = this.bottomRight.length ? this.bottomRight[0].userData.depth : 0
        return paddingLeft
      },
      cases: {
        get() {
          return this.value?.order?.cases || []
        },
        set(v) {
          let kitchen = this.value
          if (kitchen && kitchen.order && kitchen.order.cases) {
            const mapped = v.map(({uuid, userData: {form, material, size, color, value, price, sort}}) => {
              return {
                uuid,
                form,
                material,
                size,
                color,
                value,
                price,
                sort
              }
            }) || []
            mapped.forEach((el) => {
              const {uuid} = el
              const idx = kitchen.order.cases.findIndex((it) => uuid === it.uuid)
              if (idx > -1) kitchen.order.cases.splice(idx, 1, el)
              else kitchen.order.cases.push(el)
            })

            this.$emit('input', kitchen)
          }
        },
      },
      tableTopList: {
        get() {
          return []
        },
        set() {}
      }
    },
    watch: {
      bodyCase(v) {
        if (v && this.selectedCase) {
          const {position: {x, y, z}, userData: {sort, openedDoors}, place} = this.selectedCase
          v.position.set(x, y, z)
          v.userData.sort = sort
          v.userData.openedDoors = openedDoors
          this.removeCase(true)
          if (place === 'bottomRight') this.addBottomRightToScene(true)
          if (place === 'bottomLeft') this.addBottomLeftToScene(true)
          if (place === 'topRight') this.addTopRightToScene(true)
          if (place === 'topLeft') this.addTopLeftToScene(true)

          const newCase = this.scene.children.find(({userData: {sort: findSort}, place: findPlace}) => findSort === sort && findPlace === place)
          this.selectedCase = newCase
        }
        if (v) {
          const addBottomRightButton = this.scene.children.find(({name}) => name === 'addBottomRightButton')
          const addBottomLeftButton = this.scene.children.find(({name}) => name === 'addBottomLeftButton')
          const addTopRightButton = this.scene.children.find(({name}) => name === 'addTopRightButton')
          const addTopLeftButton = this.scene.children.find(({name}) => name === 'addTopLeftButton')
          if (v.userData.type !== 'bottom') {
            this.scene.remove(addBottomRightButton)
            this.scene.remove(addBottomLeftButton)
            if (!addTopRightButton && !this.isMaxRightTopPadding) this.scene.add(this.addTopRightButton)
            if (!addTopLeftButton && !this.isMaxLeftTopPadding) this.scene.add(this.addTopLeftButton)
          } else  {
            this.scene.remove(addTopRightButton)
            this.scene.remove(addTopLeftButton)
           if (!addBottomRightButton && !this.isMaxRightPadding) this.scene.add(this.addBottomRightButton)
             if (!addBottomLeftButton && !this.isMaxLeftPadding) this.scene.add(this.addBottomLeftButton)
          }
        }
      },
      topRight: {
        deep: false,
        handler(v) {
          this.cases = v
        }
      },
      topLeft: {
        deep: false,
        handler(v) {
          this.cases = v
        }
      },
      bottomRight: {
        deep: false,
        handler(v) {
          this.cases = v
        }
      },
      bottomLeft: {
        deep: false,
        handler(v) {
          this.cases = v
        }
      },
      selectedCase: {
        deep: false,
        handler(v) {
          this.caseConfigModel = v
        }
      },
      tableTopConfig() {
        this.addTableTop()
      },
      bottomPaddingRight() {
        const button = this.scene.children.find(({name}) => name === 'addBottomRightButton')
        if (this.isMaxRightPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addBottomRightButton)
        }
      },
      bottomPaddingLeft() {
        const button = this.scene.children.find(({name}) => name === 'addBottomLeftButton')
        if (this.isMaxLeftPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addBottomLeftButton)
        }
      },
      topPaddingRight() {
        const button = this.scene.children.find(({name}) => name === 'addTopRightButton')
        if (this.isMaxRightTopPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addTopRightButton)
        }
      },
      topPaddingLeft() {
        const button = this.scene.children.find(({name}) => name === 'adTopLeftButton')
        if (this.isMaxLeftTopPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addTopLeftButton)
        }
      },
    },
    methods: {
      moveLeft() {
        const currentBox = this.scene.children.find(({uuid}) => this.selectedCase.uuid === uuid)
        const {userData: {sort: currentSort}} = currentBox

        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentBox.uuid)
        const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentBox.uuid)

        if (leftIdx > -1) {
          const leftBox = this.bottomLeft.find(({userData: {sort}}) => sort === currentSort + 1)

          if (leftBox) {
            const leftBoxInScene = this.scene.children.find(({uuid}) => uuid === leftBox.uuid)

            currentBox.userData.sort += 1
            leftBoxInScene.userData.sort -= 1
          }
        }

        if (rightIdx > -1) {
          const leftBox = this.bottomRightWhiteoutAngular.find(({userData: {sort}}) => sort === currentSort - 1)

          if (leftBox) {
            const leftBoxInScene = this.scene.children.find(({uuid}) => uuid === leftBox.uuid)

            currentBox.userData.sort -= 1
            leftBoxInScene.userData.sort += 1
          }
        }
      },
      moveRight() {
        const currentBox = this.scene.children.find(({uuid}) => this.selectedCase.uuid === uuid)
        const {userData: {sort: currentSort}} = currentBox

        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentBox.uuid)
        const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentBox.uuid)

        if (leftIdx > -1) {
          const rightBox = this.bottomLeft.find(({userData: {sort}}) => sort === currentSort - 1)

          if (rightBox) {
            const rightBoxInScene = this.scene.children.find(({uuid}) => uuid === rightBox.uuid)

            currentBox.userData.sort -= 1
            rightBoxInScene.userData.sort += 1
          }
        }

        if (rightIdx > -1) {
          const rightBox = this.bottomRightWhiteoutAngular.find(({userData: {sort}}) => sort === currentSort + 1)

          if (rightBox) {
            const rightBoxInScene = this.scene.children.find(({uuid}) => uuid === rightBox.uuid)

            currentBox.userData.sort += 1
            rightBoxInScene.userData.sort -= 1

          }
        }
      },
      removeItem({uuid, type}) {
        const vm = this
        const removeItem = (uuid) => {
          const obj = vm.scene.getObjectByProperty('uuid', uuid)
          if (obj) {
            if (type === 'cases') {
              vm.selectedCase = obj
              vm.removeCase()
            }
          }
        }
        removeItem(uuid)
        vm.selectedCase = null
        const obj = vm.scene.children.filter(({name}) => name === 'selectBox')
        if (obj && obj.length) {
          obj.forEach((el) => vm.scene.remove(el))
        }
      },
      calcCasePosition(place, caseSort) {
        switch (place) {
          case 'bottomRight': {

            const items = this.bottomRight
            const angularPadding = this.bottomRight[0]?.userData?.padding || 0
            const paddingLeft = this.bottomLeft.length ? this.bottomLeft[0].userData.depth : 0
            const z = items
                .filter(({userData: {sort}}) => sort < caseSort)
                .reduce((acc, {userData: {width}}) => {
                  acc += width
                  return acc
                }, 0)
            return z + (angularPadding ? angularPadding : paddingLeft)
          }
          case 'bottomLeft': {
            const items = this.bottomLeft
            const paddingLeft = this.bottomRight.length ? this.bottomRight[0].userData.depth : 0
            const x = -(items
                .filter(({userData: {sort}}) => sort < caseSort)
                .reduce((acc, {userData: {width}}) => {
                  acc += width
                  return acc
                }, 0) + paddingLeft)
            return x
          }
          case 'topRight': {
            const items = this.topRight
            const angularPadding = this.topRight[0]?.userData?.padding || 0
            const paddingLeft = this.topLeft.length ? this.topLeft[0].userData.depth : 0
            const z = items
                .filter(({userData: {sort}}) => sort < caseSort)
                .reduce((acc, {userData: {width}}) => {
                  acc += width
                  return acc
                }, 0)
            return z + (angularPadding ? angularPadding : paddingLeft)
          }
          case 'topLeft': {
            const items = this.topLeft
            const paddingLeft = this.topRight.length ? this.topRight[0].userData.depth : 0
            const x = -(items
                .filter(({userData: {sort}}) => sort < caseSort)
                .reduce((acc, {userData: {width}}) => {
                  acc += width
                  return acc
                }, 0) + paddingLeft)
            return x
          }
        }
      },
      setCasesPosition() {
        this.scene.children.forEach((el) => {
          const {position: {x, y, z}, place, userData: {sort, width}, name} = el
          if (place === 'bottomRight') el.position.set(x, y, this.calcCasePosition(place, sort) + width / 2)
          if (place === 'bottomLeft') el.position.set(this.calcCasePosition(place, sort) - width / 2, y, z)

          if (place === 'topRight') el.position.set(x, y, this.calcCasePosition(place, sort) + width / 2)
          if (place === 'topLeft') el.position.set(this.calcCasePosition(place, sort) - width / 2, y, z)
         if (this.selectedCase) {
           const {position: {x: curx, y: cury, z: curz}} = this.selectedCase
           if (name === 'selectBox') el.position.set(curx, cury, curz)
         }
        })
      },
      calcTableTopsPosition(name, sort) {
        switch (name) {
          case 'tableTopRight': {
            const paddingRight = this.tableTopsRight.reduce((acc, {userData: {width, maxWidth, sort: minSort}}) => {
              if (minSort < sort) acc += width
              return acc
            }, 0)
            return sort ? paddingRight : 0
          }
          case 'tableTopLeft' : {
            const paddingRight = this.tableTopsLeft.reduce((acc, {userData: {width, sort: minSort}}) => {
              if (minSort < sort) acc += width
              return acc
            }, 0)
            return -paddingRight * sort - (this.bottomRight[0] ? this.bottomRight[0].userData.depth : 0)
          }
        }
      },
      setTableTopPosition() {
        this.scene.children.forEach((el) => {
          const {position: {x, y, z}, name, userData: {width, sort}} = el
          if (name === 'tableTopRight') el.position.set(x, y, this.calcTableTopsPosition(name, sort) + width / 2)
          if (name === 'tableTopLeft') el.position.set(this.calcTableTopsPosition(name, sort) - width / 2, y, z)
        })
      },
      removeCase(isReplace) {
        const selectedObject = this.scene.getObjectByProperty('uuid', this.selectedCase.uuid);
        if (selectedObject && this.selectedCase) {
          // if (['boxAngularFloor', 'boxAngularFloor_1'].includes(this.selectedCase.name) && this.bottomLeft.length && this.bottomRightWhiteoutAngular.length) return
          const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === selectedObject.uuid)
          const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === selectedObject.uuid)
          const {width, padding, depth, left} = selectedObject.userData
          if (leftIdx > -1) {
            this.bottomLeft
                .filter((el, index) => index > leftIdx)
                .forEach((el) => {
                  let {x, y, z} = el.position
                  if (!isReplace) el.position.set(el.position.x + width + (padding ? padding : 0), y, z);
                  if (!isReplace) el.userData.sort -= 1
                })
          }
          if (rightIdx > -1) {
            this.bottomRight
                .filter((el, index) => index > rightIdx)
                .forEach((el) => {
                  const {x, y, z} = el.position
                  if (!isReplace) el.position.set(x, y, z - width - (padding ? padding : 0));
                  if (!isReplace) el.userData.sort -= 1
                })
            if (['boxAngularFloor', 'boxAngularFloor_1'].includes(selectedObject.name)) {
              this.bottomLeft
                  .filter((el, index) => index > leftIdx)
                  .forEach((el) => {
                    const {x, y, z} = el.position
                    if (!isReplace) el.position.set(x + depth, y, z);
                  })
            }
          }

          this.scene.remove(selectedObject);

          if (!isReplace) this.selectedCase = null
          this.$emit('removeItem', {uuid: selectedObject.uuid, type: 'cases'})

          this.addTableTop()
        }
      },
      swapCam() {
        if (this.positionNumber < 3) this.positionNumber += 1
        else this.positionNumber = 1
      },
      toggleTableTops(v) {
        if (v) {

        } else {

        }
      },
      addAngularCaseBottom(body, isReplace) {
        if (body.userData.type !== 'bottom') return;
        if (this.bottomAngularCaseExist && !isReplace) {
          console.log('Хватит угловых шкафов снизу');
          return
        }
        body.rotation.y = threeMath.degToRad(-90)
        const {depth, height, width} = body.userData
        body.position.set(-(depth / 2 + GAP_FROM_WALL), height / 2 - LEGS_HEIGHT / 2, width / 2 + GAP_FROM_WALL + 3.5);

        body.place = 'bottomRight'

        body.userData.sort = 0

        this.bottomRight
            .forEach((el) => {
              el.userData.sort += 1
            })
        this.scene.add(body)

        this.addTableTop()
      },
      addBottomRightToScene(isReplace) {
        let body = this.bodyCase.clone();
        body.userData.openedDoors = false
        if (body.userData.type !== 'bottom') return;
        body.place = 'bottomRight'

        if (['boxAngularFloor', 'boxAngularFloor_1'].includes(body.name)) {

          this.addAngularCaseBottom(body, isReplace)
          return
        }

        const {userData: {depth, height, width}} = body

        body.rotation.y = threeMath.degToRad(-90)
        body.position.set(-(depth / 2 + GAP_FROM_WALL), height / 2 - LEGS_HEIGHT / 2, width / 2 + GAP_FROM_WALL + this.bottomPaddingRight);
        body.userData.left = false
        body.userData.top = false

        const count = this.bottomRight.length
        if (!isReplace) body.userData.sort = count

        this.scene.add(body)

        // добавляем столешницу
        this.addTableTop()
      },
      addBottomLeftToScene(isReplace) {
        let body = this.bodyCase.clone();
        const {depth, height, width} = body.userData

        if (body.userData.type !== 'bottom') return;
        body.userData.openedDoors = false
        body.place = 'bottomLeft'


        if (['boxAngularFloor', 'boxAngularFloor_1'].includes(body.name)) {

          this.addAngularCaseBottom(body, isReplace)
          return
        }
        this.setLeftBottomText()

        body.rotation.y = threeMath.degToRad(0)
        const needDepth = this.bottomRight[0] ? this.bottomRight[0].userData.depth + GAP_FACADE : 0

        body.position.set(-(width / 2 + GAP_FROM_WALL + this.bottomPaddingLeft + needDepth), height / 2 - LEGS_HEIGHT / 2, depth / 2 + GAP_FROM_WALL);
        body.userData.left = true
        body.userData.top = false

        const count = this.bottomLeft.length
        if (!isReplace) body.userData.sort = count

        this.scene.add(body)

        // добавляем столешницу
        this.addTableTop()
      },
      addTopRightToScene(isReplace) {
        let body = this.bodyCase.clone();
        if (body.userData.type !== 'top') return;
        body.userData.openedDoors = false
        body.place = 'topRight'

        const {userData: {depth, height, width}} = body

        body.rotation.y = threeMath.degToRad(-90)
        body.position.set(-(depth / 2 + GAP_FROM_WALL), height / 2 - LEGS_HEIGHT / 2 + 15, width / 2 + GAP_FROM_WALL + this.topPaddingRight);
        body.userData.left = false
        body.userData.top = true

        const count = this.topRight.length
        // body.userData.sort = count
        if (!isReplace) body.userData.sort = count

        this.scene.add(body)
      },
      addTopLeftToScene(isReplace) {
        let body = this.bodyCase.clone();
        body.userData.openedDoors = false
        if (body.userData.type !== 'top') return;
        body.place = 'topLeft'

        const {userData: {depth, height, width}} = body
        const needDepth = this.topRight[0] ? this.topRight[0].userData.depth + GAP_FACADE : 0

        body.position.set(-(width / 2 + GAP_FROM_WALL + this.topPaddingLeft + needDepth), height / 2 - LEGS_HEIGHT / 2 + 15, depth / 2 + GAP_FROM_WALL);
        body.userData.left = true
        body.userData.top = true

        const count = this.topLeft.length
        if (!isReplace) body.userData.sort = count

        this.scene.add(body)
      },
      addTableTop() {
        const vm = this

        const addNewTableTopRight = (padding, width, height, type, url, sort) => {
          const tableTop = getTableTop({width, height, type, url})

          const x = -(TABLE_TOP_DEPTH / 2)
          const y = TABLE_TOP_PADDING_BOTTOM + height / 2

          tableTop.position.x = x
          tableTop.position.y = y
          tableTop.rotation.y = threeMath.degToRad(-90);
          tableTop.name = 'tableTopRight'
          tableTop.userData.sort = sort

          this.scene.add(tableTop)
        }

        const paddingLeft = this.bottomLeft.length ? this.bottomLeft[0].userData.depth : 0

        const addNewTableTopLeft = (padding, width, height, type, url, sort) => {
          const tableTop = getTableTop({width, height, type, url})

          const y = TABLE_TOP_PADDING_BOTTOM + height / 2
          const z = TABLE_TOP_DEPTH / 2

          // tableTop.position.set(x, y, z)
          tableTop.position.z = z
          tableTop.position.y = y
          tableTop.name = 'tableTopLeft'
          tableTop.userData.sort = sort

          this.scene.add(tableTop)
        }

        const removeTableTop = (uuid) => {
          const tableTopObj = vm.scene.getObjectByProperty('uuid', uuid)
          if (tableTopObj) vm.scene.remove(tableTopObj)
        }

        const {height, type, color, maxWidth, url} = this.tableTopConfig

        this.tableTopsRight.forEach((el) => {
          const {uuid} = el
          removeTableTop(uuid)
        })

        this.tableTopsLeft.forEach((el) => {
          const {uuid} = el
          removeTableTop(uuid)
        })

        const rightWidth = this.bottomRight.reduce((acc, {userData: {width, padding}}) => {
          acc += width + (padding ? padding : 0)
          return acc
        }, 0) + (this.bottomAngularCaseExist ? 0 : paddingLeft)

        const leftWidth = this.bottomLeft.reduce((acc, {userData: {width}}) => {
          acc += width
          return acc
        }, 0)

        const rightCount = Math.trunc(rightWidth / maxWidth)
        const fractionRight = rightWidth - maxWidth * rightCount
        console.log(rightWidth, maxWidth, rightCount)

        if (rightCount) {

          for (let i = 0; i <= rightCount - 1; i++) {
            addNewTableTopRight(0, maxWidth, height, type, url, i)
          }
          if (fractionRight) addNewTableTopRight(0, fractionRight, height, type, url, rightCount)
        } else {
          if (fractionRight) {
            console.log({fractionRight, height, type, url})
            addNewTableTopRight(0, fractionRight, height, type, url, 0)
          }

        }

        const leftCount = Math.trunc(leftWidth / maxWidth)
        const fractionLeft = leftWidth - maxWidth * leftCount

        if (leftCount) {
          for (let i = 0; i <= leftCount - 1; i++) {
            addNewTableTopLeft(0, maxWidth, height, type, url, i)
          }
          if (fractionLeft) addNewTableTopLeft(0, fractionLeft, height, type, url, leftCount)
        } else {
          if (fractionLeft) addNewTableTopLeft(0, fractionLeft, height, type, url, 0)
        }
      },
      initWalls() {
        let wallWidth = 60 * 2;
        let wallHeight = 35;
        let wallGeometry = new PlaneGeometry(wallWidth, wallHeight);
        let floorGeometry = new PlaneGeometry(wallWidth, wallWidth);
        let floorMaterial = new MeshStandardMaterial({
          color: 0xd2b8a3/*af9182*/,
        });
        floorMaterial.roughness = 0.8;
        floorMaterial.metalness = 0.1;
        const floorTextureLoader = new TextureLoader();
        const wallTextureLoader = new TextureLoader();

        const wallNormalTexture = wallTextureLoader.load(require('./img/wall.jpg'));
        const floorNormalTexture = floorTextureLoader.load(require('./img/floor.jpg'));

        let wallMaterial = new MeshStandardMaterial({
          color: 0xffedde/*c8b7ae*/,
        });
        wallMaterial.roughness = 1;
        wallMaterial.metalness = 0.2;
        wallMaterial.normalMap = wallNormalTexture;

        floorMaterial.normalMap = floorNormalTexture;

        const wall = new Mesh(wallGeometry, wallMaterial);
        const wallR = new Mesh(wallGeometry, wallMaterial);
        const floor = new Mesh(floorGeometry, floorMaterial);

        wall.material.normalMap.repeat.set(8 * 2, 4 * 2);
        wall.material.needsUpdate = true;
        wallR.material.normalMap.repeat.set(4 * 2, 8 * 2);
        wallR.material.needsUpdate = true;
        wall.material.normalMap.wrapS = wall.material.normalMap.wrapT = RepeatWrapping;
        wallR.material.normalMap.wrapS = wallR.material.normalMap.wrapT = RepeatWrapping;
        wall.name = "wall"

        wallR.name = "wallR"

        floor.material.normalMap.repeat.set(3 * 2, 3 * 2);
        floor.material.needsUpdate = true;
        floor.material.normalMap.wrapS = floor.material.normalMap.wrapT = RepeatWrapping;

        wall.position.set(-wallWidth / 2, wallHeight / 2, 0);
        wallR.position.set(0, wallHeight / 2, wallWidth / 2);
        floor.position.set(-wallWidth / 2, 0, wallWidth / 2);
        wallR.rotation.y = threeMath.degToRad(-90);
        floor.rotation.x = threeMath.degToRad(-90);
        this.scene.add(floor);
        this.scene.add(wallR);
        this.scene.add(wall);

        wallGeometry.dispose()
        floorGeometry.dispose()
        floorMaterial.dispose()
        wallNormalTexture.dispose()
        floorNormalTexture.dispose()
        wallMaterial.dispose()
      },
      selectCase() {
        const vm = this
        const mouse = new Vector2();
        const raycaster = new Raycaster();

        this.$refs.canvas.addEventListener('pointerdown', onPointerDown);

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

        function onPointerDown(event) {
          if (event.target.className !== "controls") return
          const canvasPos = vm.$refs.canvas.getBoundingClientRect()
          mouse.x = ((event.clientX - canvasPos.x) / 800) * 2 - 1;
          mouse.y = -((event.clientY - canvasPos.y) / 600) * 2 + 1;

          raycaster.setFromCamera(mouse, vm.camera);

          const intersects = raycaster.intersectObjects(vm.scene.children, true);
          if (intersects.length > 0) {
            const object = intersects[0].object;

            let controlActionName = findActionName(object)



            vm.$emit('setConfigName',  '')
            if (controlActionName) {
              vm[controlActionName]()

            } else {
              vm.selectedCase = recursiveFindBox(object)

              vm.$emit('setConfigName', vm.selectedCase?.name )


              if (recursiveFindBox(object)) {
                const obj = vm.scene.children.find(({name}) => name === 'selectBox')
                vm.scene.remove(obj)
                const { userData: {width, height, depth}, position: {x,y,z}, rotation: {y: rotate} } = vm.selectedCase
                const leftTop = selectBox({width, height, depth, x,y,z, rotate})
                vm.scene.add(leftTop)
                leftTop.position.set(x, y, z )
                leftTop.rotation.y = rotate
              } else {
                const obj = vm.scene.children.find(({name}) => name === 'selectBox')
                vm.scene.remove(obj)
              }
            }
          }
        }
      },
      openDoors() {
        if (this.selectedCase) {
          const {userData: {openedDoors}} = this.selectedCase
          if (this.selectedCase) this.selectedCase.userData.openedDoors = !openedDoors
        }
      },
      addControlBoxes() {
        this.scene.add(this.addBottomRightButton)
        this.scene.add(this.addBottomLeftButton)
        this.scene.add(this.addTopRightButton)
        this.scene.add(this.addTopLeftButton)
      },
      setControlBoxesPosition() {
        const addBottomLeftButton = this.scene.getObjectByName('addBottomLeftButton')
        if (addBottomLeftButton) addBottomLeftButton.position.set(-6 - this.bottomPaddingLeft - (this.bottomRight[0] ? this.bottomRight[0].userData.depth : 0), 5, 1)
        const addBottomRightButton = this.scene.children.find(({name}) => name === 'addBottomRightButton')
        if (addBottomRightButton) addBottomRightButton.position.set(-1, 5, 6 + this.bottomPaddingRight + (this.bottomLeft[0] && !this.bottomRight[0] ? this.bottomLeft[0].userData.depth : 0))

        const addTopLeftButton = this.scene.getObjectByName('addTopLeftButton')
        if (addTopLeftButton) addTopLeftButton.position.set(-6 - this.topPaddingLeft - (this.topRight[0] ? this.topRight[0].userData.depth : 0), 20, 1)
        const addTopRightButton = this.scene.children.find(({name}) => name === 'addTopRightButton')
        if (addTopRightButton) addTopRightButton.position.set(-1, 20, 6 + this.topPaddingRight + (this.topLeft[0] && !this.topRight[0] ? this.topLeft[0].userData.depth : 0))

      },
      setLeftBottomText() {
      //   const helvetiker = './font/font.typeface.json'
      //   const loader = new FontLoader();
      //   loader.load(helvetiker, function (font) {
      //
      //     const color = 0x006699;
      //
      //     const matDark = new LineBasicMaterial({
      //       color: color,
      //       side: DoubleSide
      //     });
      //
      //     const matLite = new MeshBasicMaterial({
      //       color: color,
      //       transparent: true,
      //       opacity: 0.4,
      //       side: DoubleSide
      //     });
      //
      //     const message = "   Three.js\nSimple text.";
      //
      //     const shapes = font.generateShapes(message, 100);
      //
      //     const geometry = new ShapeGeometry(shapes);
      //
      //     geometry.computeBoundingBox();
      //
      //     const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      //
      //     geometry.translate(xMid, 0, 0);
      //
      //     // make shape ( N.B. edge view not visible )
      //
      //     const text = new Mesh(geometry, matLite);
      //     text.position.z = 10;
      //     this.scene.add(text);
      //
      //     // make line shape ( N.B. edge view remains visible )
      //
      //     const holeShapes = [];
      //
      //     for (let i = 0; i < shapes.length; i++) {
      //
      //       const shape = shapes[i];
      //
      //       if (shape.holes && shape.holes.length > 0) {
      //
      //         for (let j = 0; j < shape.holes.length; j++) {
      //
      //           const hole = shape.holes[j];
      //           holeShapes.push(hole);
      //
      //         }
      //
      //       }
      //
      //     }
      //
      //     shapes.push.apply(shapes, holeShapes);
      //
      //     const lineText = new Object3D();
      //
      //     for (let i = 0; i < shapes.length; i++) {
      //
      //       const shape = shapes[i];
      //
      //       const points = shape.getPoints();
      //       const geometry = new BufferGeometry().setFromPoints(points);
      //
      //       geometry.translate(xMid, 0, 0);
      //
      //       const lineMesh = new Line(geometry, matDark);
      //       lineText.add(lineMesh);
      //
      //     }
      //
      //     this.scene.add(lineText);
      //
      //   }); //end lo
      }
    },
    mounted() {
      const vm = this
      vm.renderer.shadowMap.enabled = true;
      vm.renderer.setSize(windows.innerWidth, windows.innerHeight);
      this.$refs.canvas.appendChild(vm.renderer.domElement);

      this.initWalls()

      vm.camera.position.z = 80;

      let n = 2;
      let spotLight = new SpotLight(0xffffff);
      spotLight.position.set(-60 * n, 55 * n, 60 * n);
      spotLight.target.position.set(-10, 10, 10);
      spotLight.intensity = 1
      vm.scene.add(spotLight);
      vm.scene.add(spotLight.target);

      let spotLight_1 = new PointLight(0xffffff);
      spotLight_1.position.set(-20, 10, 20);
      spotLight_1.intensity = 0.2
      vm.scene.add(spotLight_1);

      let spotLight_3 = new PointLight(0xffffff);
      spotLight_3.position.set(-80, 10, 5);
      spotLight_3.intensity = 0.2
      vm.scene.add(spotLight_3);

      let spotLight_4 = new PointLight(0xffffff);
      spotLight_4.position.set(-5, 10, 80);
      spotLight_4.intensity = 0.2
      vm.scene.add(spotLight_4);

      let spotLight_2 = new SpotLight(0xffffff);
      spotLight_2.position.set(0, 0, 0);
      spotLight_2.target.position.set(-60 * n, 55 * n, 60 * n);
      spotLight_2.intensity = 0.6
      vm.scene.add(spotLight_2);
      vm.scene.add(spotLight_2.target);

      const color = 0xFFFFFF;
      const intensity = 0.1;
      const width = 100;
      const height = 100;
      /*const light = new RectAreaLight(color, intensity, width, height);
      light.position.set(-50, 36, 50);
      light.rotation.x = threeMath.degToRad(-90);
      vm.scene.add(light);*/

      /*const light1 = new RectAreaLight(color, intensity, width, height);
      light1.position.set(-50, -1, 50);
      light1.rotation.x = threeMath.degToRad(90);
      vm.scene.add(light1);*/

      /*let n = 1.6;
      let spotLight = new SpotLight(0xffffff);
      spotLight.position.set(-60*n, 40, 60*n);
      spotLight.target.position.set(-10, 10, 10);
      spotLight.intensity = 0.8
      vm.scene.add(spotLight);
      vm.scene.add(spotLight.target);

      let spotLight_1 = new SpotLight(0xffffff);
      spotLight_1.position.set(-20, 60*n, 20);
      spotLight_1.target.position.set(0, 0, 0 );
      spotLight_1.intensity = 0.2
      vm.scene.add(spotLight_1);
      vm.scene.add(spotLight_1.target);

      let spotLight_2 = new SpotLight(0xffffff);
      spotLight_2.position.set(0, 0, 0);
      spotLight_2.target.position.set(-50*n, 55*n, 50*n);
      spotLight_2.intensity = 0.6
      vm.scene.add(spotLight_2);
      vm.scene.add(spotLight_2.target);

      const color = 0xFFFFFF;
      const intensity = 0.8;
      const width = 100;
      const height = 100;
      const light = new RectAreaLight(color, intensity, width, height);
      light.position.set(-50, 36, 50);
      light.rotation.x = threeMath.degToRad(-90);
      vm.scene.add(light);

      const light1 = new RectAreaLight(color, intensity, width, height);
      light1.position.set(-50, -41, 50);
      light1.rotation.x = threeMath.degToRad(80);
      vm.scene.add(light1);*/

      vm.addControlBoxes()

      vm.selectCase()

      vm.scene.rotation.y = threeMath.degToRad(45);

      function fromTo(value, from, to, steps) {
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

      function render() {
        requestAnimationFrame(render);

        vm.setControlBoxesPosition()
        vm.setCasesPosition()
        vm.setTableTopPosition()

        vm.scene.children.filter((it) => it.userData.openedDoors !== undefined).forEach((it) => {
          const group = it.children.find(el => el.name === 'group')
          const leftDoor = group.children.find(el => el.name === 'leftDoor')
          const rightDoor = group.children.find(el => el.name === 'rightDoor')
          const {userData: {openedDoors}} = it

          const speedOpen = 15

          if (openedDoors) {
            if (leftDoor) leftDoor.rotation.y = fromTo(leftDoor.rotation.y, 0, threeMath.degToRad(-90), speedOpen);
            if (rightDoor) rightDoor.rotation.y = fromTo(rightDoor.rotation.y, 0, threeMath.degToRad(90), speedOpen);
          } else {
            if (leftDoor) leftDoor.rotation.y = fromTo(leftDoor.rotation.y, threeMath.degToRad(-90), 0, speedOpen);
            if (rightDoor) rightDoor.rotation.y = fromTo(rightDoor.rotation.y, threeMath.degToRad(90), 0, speedOpen);
          }
        })

        let step = 13;
        vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, vm.camPos.y, step);
        vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, vm.camPos.x, step);
        vm.camera.position.z = fromTo(vm.camera.position.z, vm.camera.position.z, vm.camPos.cPz, step);
        vm.scene.position.x = fromTo(vm.scene.position.x, vm.scene.position.x, vm.camPos.sPx, step);

        vm.renderer.render(vm.scene, vm.camera);
      }

      render();
    }
  }
</script>

<style lang="scss">
  .buttons {
    padding-top: 20px;
  }

  .button + .button {
    margin-left: 8px;
  }

  .canvas {
    position: relative;
  }

  .controls {
    position: absolute;
    width: 100%;
    height: 100%;
    user-select: none;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 6px;
      width: 48px;
      height: 48px;
      background: #FFFFFF;
      border-radius: 4px;
      cursor: pointer;
      transition: .2s ease-in-out;
      border: none;
      outline: none;

      &:disabled {
        opacity: .4;
      }

      &:hover:not(:disabled) {
        background-color: #E3E5E8;
      }

    }

    .camera {
      position: absolute;
      left: 10px;
      top: 10px;

      &__variants {
        height: 4px;
        display: flex;
        justify-content: center;

        .item + .item {
          padding-left: 4px;
        }

        .item {
          display: flex;
          height: 4px;

          svg path {
            transition: .3s ease-in-out;
          }
        }
      }
    }

    .box-control {
      position: absolute;
      display: flex;
      bottom: 10px;
      left: calc(50% - 108px);

      .left {

      }

      .right {
        transform: rotateY(180deg);
      }
    }
  }
</style>
