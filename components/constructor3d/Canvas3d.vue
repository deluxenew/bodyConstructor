<template lang="pug">
  div
    div.canvas(ref="canvas")

</template>


<script>
  import * as THREE from "three"
  import StartLoader from "./StartLoader";
  import HF from "./HelperFunctions";
  import boxes from "./models/boxes/BoxesList";

  const { scene, renderer, spotLights, camera, walls, controlBoxes } = StartLoader
  const { fromTo, camPos } = HF

  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 600
  const MAX_PLACE_WIDTH = 50

  export default {
    name: "Canvas3d",
    props: {},
    data() {
      return {
        renderer: renderer(CANVAS_WIDTH, CANVAS_HEIGHT),
        scene: scene(),
        camera: camera(CANVAS_WIDTH, CANVAS_HEIGHT),
        positionNumber: 1,
        casesType: 'bottom',
        caseModel: boxes.f_400,
        selectedBox: null,
        cbDeferTs: null
      }
    },
    watch: {
      casesType: {
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
    },
    methods: {
      init() {
        walls.forEach(wall => this.scene.add(wall))
        spotLights.forEach(spotLight => this.scene.add(spotLight))
        controlBoxes.forEach(control => this.scene.add(control))
        this.$refs.canvas.appendChild(this.renderer.domElement);
        this.selectCase()
      },
      setControlsVisible() {
        this.sceneObjects.control.forEach((el) => {
          const { userData: { pos, watcher } } = el
          el.visible = pos === this.casesType && this[watcher] <= MAX_PLACE_WIDTH
          if (watcher !== 'widthLeftBottom' && this.caseModel && this.caseModel.userData['configType'] === 'angularBox') el.visible = false
        })
      },

      setControlsPosition() {
        this.sceneObjects.control.forEach((el) => {
          const { userData: { getCoords, watcher }, position: { x, y, z } } = el
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
          // if (event.target.className !== "controls") return
          const canvasPos = vm.$refs.canvas.getBoundingClientRect()
          mouse.x = ((event.clientX - canvasPos.x) / CANVAS_WIDTH) * 2 - 1;
          mouse.y = -((event.clientY - canvasPos.y) / CANVAS_HEIGHT) * 2 + 1;

          raycaster.setFromCamera(mouse, vm.camera);

          const intersects = raycaster.intersectObjects(vm.scene.children, true);
          if (intersects.length > 0) {
            const object = intersects[0].object;
            const controlActionName = HF.findActionName(object)

            vm.$emit('setConfigName',  '')

            if (controlActionName) {
              vm[controlActionName]()
            } else {
              const findBox = HF.recursiveFindBox(object)

              vm.selectedBox = findBox

              vm.$emit('setConfigName', vm.selectedBox?.name )

              if (findBox) {
                clearHelpers()

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
      sceneObjects() {
        const result = this.scene.children.reduce((acc, el) => {
          const { userData: { type } } = el
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
      }

      // const xAxis = new THREE.Vector3( 1, 0, 0 );
      //
      // const qInitial = new THREE.Quaternion().setFromAxisAngle( xAxis, 0 );
      // const qFinal = new THREE.Quaternion().setFromAxisAngle( xAxis, Math.PI );
      // const quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
      //
      // const clip = new THREE.AnimationClip( 'Action', 3, [  quaternionKF] );
      // let mixer = new THREE.AnimationMixer( vm.scene );
      //
      // const clipAction = mixer.clipAction( clip );
      // clipAction.play();
      // mixer.update()

      render()
    }
  }
</script>

<style scoped lang="scss">
  .canvas {
    position: relative;
    user-select: none;
  }
</style>
