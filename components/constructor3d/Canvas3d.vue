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
          button.button.left(:disabled="!selectedBox || !isMoveLeftActive || isAngularIsSelected" @click="moveLeft")
            img(:src="require('./img/arrow.svg')")
          button.button.right(:disabled="!selectedBox || !isMoveRightActive || isAngularIsSelected" @click="moveRight")
            img(:src="require('./img/arrow.svg')")
          button.button.open(:disabled="!selectedBox" @click="openDoors")
            img(:src="require('./img/doors.svg')")
          button.button.remove(:disabled="!selectedBox" @click="removeCase")
            img(:src="require('./img/trash.svg')")

</template>


<script>
import * as THREE from "three"
import StartLoader from "./StartLoader";
import HF from "./HelperFunctions";
import boxes from "./models/boxes/BoxesList";
import {AnimationClip, AnimationMixer, Quaternion, QuaternionKeyframeTrack, Vector3} from "three";

const {scene, renderer, spotLights, camera, walls, controlBoxes} = StartLoader
const {fromTo, camPos} = HF

const CANVAS_WIDTH = 780
const CANVAS_HEIGHT = 600
const MAX_PLACE_WIDTH = 50

export default {
  name: "Canvas3d",
  props: {
    controlsVerticalPosition: {
      type: String,
      default: 'floor'
    },
    caseModelCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      renderer: renderer(CANVAS_WIDTH, CANVAS_HEIGHT),
      scene: scene(),
      camera: camera(CANVAS_WIDTH, CANVAS_HEIGHT),
      positionNumber: 1,
      // caseModel: boxes.f_400_820_1b,
      selectedBox: null,
      mixer: null,
      clock: new THREE.Clock(),
      animations: [],
    }
  },
  watch: {
    controlsVerticalPosition: {
      immediate: true,
      async handler() {
        await this.$nextTick()
        this.setControlsVisible()
      }
    },
    sceneObjects: {
      immediate: false,
      async handler() {
        await this.$nextTick()
        this.setControlsVisible()
        this.setControlsPosition()
        HF.setCasesPosition(this.scene.children)
      }
    },
    caseModelCode() {
      this.setControlsVisible()
    },
  },
  methods: {
    init() {
      walls.forEach(wall => this.scene.add(wall))
      spotLights.forEach(spotLight => this.scene.add(spotLight))
      controlBoxes.forEach(control => this.scene.add(control))
      this.$refs.canvas.appendChild(this.renderer.domElement);
      this.selectCase()
    },
    swapCam() {
      if (this.positionNumber < 3) this.positionNumber += 1
      else this.positionNumber = 1
    },
    moveLeft() {

    },
    moveRight() {

    },
    openDoors() {
      if (this.selectedBox) {
        const {userData: {openedDoors}} = this.selectedBox

        const facade = HF.getFacadeGroup(this.selectedBox)
        if (!facade) return
        const xAxis = new Vector3( 0, -1, 0 );

        const qInitial = new Quaternion().setFromAxisAngle( xAxis, 0 );
        const qFinal = new Quaternion().setFromAxisAngle( xAxis, Math.PI / 2);
        const quaternionKF = new QuaternionKeyframeTrack( '.quaternion', [ 0, 1 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w ] );
        const quaternionKFR = new QuaternionKeyframeTrack( '.quaternion', [ 0, 1 ], [ qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
        let anim = openedDoors ? quaternionKFR : quaternionKF

        const clip = new AnimationClip( 'Action', 1, [  anim] );
        this.mixer = new AnimationMixer( facade );

        const clipAction = this.mixer.clipAction( clip );
        clipAction.loop = THREE.LoopOnce;
        clipAction.clampWhenFinished = true
        console.log(clipAction.getClip())
        clipAction.play();
        this.mixer.addEventListener( 'finished', function( e ) {
          console.log(e)
        })

        this.selectedBox.userData.openedDoors = !openedDoors
      }
    },
    removeCase(isReplace) {

    },
    setControlsVisible() {
      const widths = {
        widthLeftBottom: this.widthLeftBottom,
        widthRightBottom: this.widthRightBottom,
        widthLeftTop: this.widthLeftTop,
        widthRightTop: this.widthRightTop
      }
      HF.setControlsVisible(this.sceneObjects, this.caseModel, this.controlsVerticalPosition, widths, MAX_PLACE_WIDTH)
    },

    setControlsPosition() {
      this.sceneObjects.control.forEach((el) => {
        const {userData: {getCoords, watcher}, position: {x, y, z}} = el
        el.position.set(...getCoords(x, y, z, this[watcher]))
      })
    },
    addBoxToScene(pos) {
      const box = this.caseModel.clone()
      const count = this.sceneObjects[pos] ? this.sceneObjects[pos].length : 0
      box.userData['type'] = pos
      box.userData['sort'] = count
      return box
    },
    addBottomLeftToScene() {
      this.scene.add(this.addBoxToScene('bottomLeft'))
    },
    addBottomRightToScene() {
      this.scene.add(HF.rotationY(this.addBoxToScene('bottomRight')))
    },
    addTopLeftToScene() {
      this.scene.add(this.addBoxToScene('topLeft'))
    },
    addTopRightToScene() {
      this.scene.add(HF.rotationY(this.addBoxToScene('topRight')))
    },
    selectCase() {
      const vm = this
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      this.$refs.canvas.addEventListener('pointerdown', onPointerDown);

      function clearHelpers() {
        vm.scene.children.forEach((el) => {
          const edges = el.children.find(({name}) => name === 'edges')
          const transparent = el.children.find(({name}) => name === 'transparent')
          if (edges) {
            edges.visible = false
            transparent.visible = false
          }
        })
      }

      function onPointerDown(event) {
        // console.log(event)
        if (event.target.className !== "controls") return
        const canvasPos = vm.$refs.canvas.getBoundingClientRect()
        mouse.x = ((event.clientX - canvasPos.x) / CANVAS_WIDTH) * 2 - 1;
        mouse.y = -((event.clientY - canvasPos.y) / CANVAS_HEIGHT) * 2 + 1;

        raycaster.setFromCamera(mouse, vm.camera);

        const intersects = raycaster.intersectObjects(vm.scene.children, true);
        if (intersects.length > 0) {
          const object = intersects[0].object;
          const controlActionName = HF.findActionName(object)

          vm.$emit('setConfigName', '')

          if (controlActionName) {
            vm[controlActionName]()
          } else {
            const findBox = HF.recursiveFindBox(object)

            vm.selectedBox = findBox

            if (findBox) {
              clearHelpers()
              vm.$emit('getBoxName', vm.selectedBox?.name || null)

              const edges = findBox.children.find(({name}) => name === 'edges')
              const transparent = findBox.children.find(({name}) => name === 'transparent')

              edges.visible = true
              transparent.visible = true
            } else {
              clearHelpers()
            }
          }
        }
      }
    },
  },
  computed: {
    caseModel() {
      if (!this.caseModelCode) return null
      const caseModelCodeFormatted = this.caseModelCode.replaceAll('-', '_')
      const findModel = boxes[caseModelCodeFormatted]
      if (findModel) return findModel
    },
    isMoveRightActive() {
      return true
      // const currentUuid = this.selectedCase?.uuid
      // if (!currentUuid) return false
      // const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
      // const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentUuid)
      // return (leftIdx > 0 && this.bottomLeft.length > 1)
      //   || (rightIdx > -1 && rightIdx < this.bottomRight.length - 1 && this.bottomRight.length > 1)
    },
    isMoveLeftActive() {
      return true
      // const currentUuid = this.selectedCase?.uuid
      // if (!currentUuid) return false
      // const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
      // const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === currentUuid)
      // return (rightIdx > 0 && this.bottomRight.length > 1)
      //   || (leftIdx > -1 && leftIdx < this.bottomLeft.length - 1 && this.bottomLeft.length > 1)
    },
    isAngularIsSelected() {
      return true
      // return ['boxAngularFloor', 'boxAngularFloor_1'].includes(this.selectedCase?.name)
    },
    sceneObjects() {
      const result = this.scene.children.reduce((acc, el) => {
        const {userData: {type}} = el
        if (type) {
          if (!acc[type]) acc[type] = []
          acc[type].push(el)
        }
        return acc
      }, {})
      return result
    },
    widthLeftBottom() {
      return HF.getPlaceWidth(this.sceneObjects.bottomLeft, this.sceneObjects.bottomRight)
    },
    widthRightBottom() {
      return HF.getPlaceWidth(this.sceneObjects.bottomRight, this.sceneObjects.bottomLeft)
    },
    widthLeftTop() {
      return HF.getPlaceWidth(this.sceneObjects.topLeft, this.sceneObjects.topRight)
    },
    widthRightTop() {
      return HF.getPlaceWidth(this.sceneObjects.topRight, this.sceneObjects.topLeft)
    },
    camPosition() {
      return camPos(this.positionNumber, this.widthRightBottom, this.widthLeftBottom, this.widthRightTop, this.widthLeftTop)
    },
  },
  mounted() {
    const vm = this

    this.init()

    function render() {
      let steps = 13;
      requestAnimationFrame(render);
      vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, vm.camPosition.y, steps);
      vm.scene.position.x = fromTo(vm.scene.position.x, vm.scene.position.x, vm.camPosition.sPx, steps);
      vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, vm.camPosition.x, steps);
      vm.camera.position.z = fromTo(vm.camera.position.z, vm.camera.position.z, vm.camPosition.cPz, steps);
      vm.renderer.render(vm.scene, vm.camera);

      const delta = vm.clock.getDelta();

      if (vm.mixer) {

        vm.mixer.update( delta);

      }
    }

    render()
  }
}
</script>

<style scoped lang="scss">

.buttons {
  padding-top: 20px;
}

.button + .button {
  margin-left: 8px;
}

.canvas {
  position: relative;
  user-select: none;
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
