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

  const MAX_WIDTH = 50

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
        caseModel:null,
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
          el.visible = pos === this.casesType && this[watcher] <= MAX_WIDTH
        })
      },

      setControlsPosition() {
        this.sceneObjects.control.forEach((el) => {
          const { userData: { getCoords, watcher }, position: { x, y, z } } = el
          el.position.set(...getCoords(x, y, z, this[watcher]))
        })
      },
      addBottomLeftToScene() {
        this.scene.add(boxes.f_400.clone())
      },
      addBottomRightToScene() {

      },
      addTopLeftToScene() {

      },
      addTopRightToScene() {

      },
      selectCase() {
        const vm = this
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        this.$refs.canvas.addEventListener('pointerdown', onPointerDown);

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

            let controlActionName = HF.findActionName(object)

            vm.$emit('setConfigName',  '')
            if (controlActionName) {
              vm[controlActionName]()
            } else {
              const findBox = HF.recursiveFindBox(object)
              console.log(findBox)
              vm.caseModel = findBox

              vm.$emit('setConfigName', vm.caseModel?.name )

              if (findBox) {
                const obj = findBox.children.find(({name}) => name === 'edges')
                obj.visible = true
              } else {
                vm.scene.children.forEach((el) => {
                  const box = el.children.find(({name}) => name === 'edges')
                  if (box) box.visible = false
                })
                // vm.scene.remove(obj)
              //   const { userData: {width, height, depth}, position: {x,y,z}, rotation: {y: rotate} } = vm.caseModel
              //   const leftTop = selectBox({width, height, depth, x,y,z, rotate})
              //   vm.scene.add(leftTop)
              //   leftTop.position.set(x, y, z )
              //   leftTop.rotation.y = rotate
              // } else {
              //   const obj = vm.scene.children.find(({name}) => name === 'selectBox')
              //   vm.scene.remove(obj)
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
        return 10
      },
      widthRightBottom() {
        return 10
      },
      widthLeftTop() {
        return 10
      },
      widthRightTop() {
        return 10
      },
      camPosition() {
        return camPos(
          this.positionNumber,
          this.widthRightBottom,
          this.widthLeftBottom,
          this.widthRightTop,
          this.widthLeftTop
        )
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
