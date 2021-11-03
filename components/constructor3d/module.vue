<template lang="pug">
  div
    div(ref="canvas")
    div.buttons
      button.button(@click="addCaseToScene('bottomLeft')")
        | Добавить слева снизу
      button.button(@click="addCaseToScene('bottomRight')")
        | Добавить справа снизу

      button.button(@click="openDoors") Открыть двери
      button.button(@click="swapCam") Сменить камеру

      div(v-if="selectedCase && selectedCase.name")
        | {{selectedCase ? selectedCase.name : ''}}
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
  BoxGeometry,
  CylinderGeometry,
  Object3D,
  SpotLight,
  Vector2,
  Raycaster
} = Three

const windows = { innerHeight: 600, innerWidth: 800 }

let legsHeight = 1;
let gapFacade = 0.1;
let sideDepth = .3;
let gapFromWall = sideDepth;

import boxes from './CasesListConfig.js'
const { boxStandardFloor, boxAngularFloor, boxControl} = boxes

export default {
  props: {
    caseConfig: {
      type: Object,
      default: () => {}
    },
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
      camera: new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200),
    }
  },
  computed: {
    bottomRight() {
      return this.scene.children.filter(({name, place}) => ['angularBody', 'body'].includes(name) && place === 'bottomRight')
    },
    bottomLeft() {
      return this.scene.children.filter(({name, place}) => ['angularBody', 'body'].includes(name) && place === 'bottomLeft')
    },
    controlCase() {
      return boxControl
    },
    camPos() {
      const vm = this

      function povSet(wL, wR, camAngle, camZ){
        var alfa =  Math.atan(wL/wR);
        var g = Math.sqrt(Math.pow(wL,2) + Math.pow(wR,2));
        var a = Math.pow(wL,2)/g;
        var b = g - a;
        var h =  Math.sqrt(a*b);
        var h2 = Math.tan( threeMath.degToRad(90 - camAngle/2)) * g/2 + h/2;
        // vm.scene.rotation.y =  alfa;
        // vm.scene.rotation.y = threeMath.degToRad(90) - alfa;
        vm.scene.position.x =  (a - b)/2;
        if (h2 > camZ) {
          vm.camera.position.z = h2;
          console.log(h2, 'h2')
        }
        else{
          vm.camera.position.z = camZ;
          console.log(camZ, 'camZ')
        }
      }

      const wr = vm.bottomRight.reduce((acc, el) => {
        if (el) {
          const { userData: { width }} = el
          acc += width
        }
        return acc
      }, 10)
      const wl = vm.bottomLeft.reduce((acc, el) => {
        if (el) {
          const { userData: { width }} = el
          acc += width
        }
        return acc
      }, 10)
      povSet(wl, wr, 45, 50)

      const cameraPositions = {
        pos1: {
          x: 0,
          y: 45,
          z: 30,
        },
        pos2: {
          x: 20,
          y: 90,
          z: 11,
        },
        pos3: {
          x: -20,
          y: 0,
          z: 20,
        }
      }
      return cameraPositions[`pos${this.positionNumber}`]
    },
    bodyCase() {
     return this.caseConfig
    }
  },
  watch: {
    selectedCase: {
      deep: true,
      handler(v) {
        const control = this.scene.children.find(el => el.name === 'control')
        control.visible = Boolean(v)

        if (v) {
          control.rotation.y = v.rotation.y
          const left = v.userData.left
          let x, y, z
          if (left) {
            x = v.position.x - 2.4
            y = v.position.y - 1.5
            z = v.userData.depth + 1
          } else {
            x = -v.userData.depth - 1
            y = v.position.y - 1.5
            z = v.position.z - 2.4
          }

          control.position.set(x, y, z)
        }
      }
    }
  },
  methods: {
    swapCam() {
      if (this.positionNumber < 3) this.positionNumber += 1
      else this.positionNumber = 1
    },
    addCaseToScene(place = "bottomRight") {
      let body = this.bodyCase.clone();
      body.userData.openedRoors = false
      body.place = place

      switch (place) {
        case "bottomRight": {
          body.rotation.y = threeMath.degToRad(-90)
          const depth = this.bottomLeft[0] ? this.bottomLeft[0].userData.depth + gapFacade : 0
          const paddingRight = this.bottomRight.reduce((acc, el) => {
            if (el) {
              const { userData: { width }} = el
              acc += width
            }
            return acc
          }, 0)

          body.position.set(-(body.userData.depth / 2 + gapFromWall), body.userData.height / 2 - legsHeight / 2, body.userData.width / 2 + gapFromWall + paddingRight + depth);
          body.userData.left = false
          body.userData.top = false
        }
          break;
        case "bottomLeft": {
          body.rotation.y = threeMath.degToRad(0)
          const depth = this.bottomRight[0] ? this.bottomRight[0].userData.depth + gapFacade : 0
          const paddingLeft = this.bottomLeft.reduce((acc, el) => {
            if (el) {
              const { userData: { width }} = el
              acc += width
            }
            return acc
          }, 0)

          body.position.set(-(body.userData.width / 2 + gapFromWall + paddingLeft + depth), body.userData.height / 2 - legsHeight / 2, body.userData.depth / 2 + gapFromWall);
          body.userData.left = true
          body.userData.top = false
        }
          break;
      }
      this.scene.add(body)
    },
    initWalls() {
      let wallWidth = 60;
      let wallHeight = 27;
      let wallGeometry = new PlaneGeometry(wallWidth, wallHeight);
      let floorGeometry = new PlaneGeometry(wallWidth, wallWidth);
      let floorMaterial = new MeshStandardMaterial({
        color: 0xaf9182,
      });
      floorMaterial.roughness = 0.3;
      floorMaterial.metalness = 0.05;
      const floorTextureLoader = new TextureLoader();
      const wallTextureLoader = new TextureLoader();


      const wallNormalTexture = wallTextureLoader.load(require('./img/wall.jpg'));
      const floorNormalTexture = floorTextureLoader.load(require('./img/floor.jpg'));

      let wallMaterial = new MeshStandardMaterial({
        color: 0xc8b7ae,
      });
      wallMaterial.roughness = 1;
      wallMaterial.metalness = 0;
      wallMaterial.normalMap = wallNormalTexture;

      floorMaterial.normalMap = floorNormalTexture;
      //facadeMaterial.normalMap = facadeNormalTexture;

      const wall = new Mesh(wallGeometry, wallMaterial);
      const wallR = new Mesh(wallGeometry, wallMaterial);
      const floor = new Mesh(floorGeometry, floorMaterial);

      wall.material.normalMap.repeat.set(8, 4);
      wall.material.needsUpdate = true;
      wall.material.normalMap.wrapS = wall.material.normalMap.wrapT = RepeatWrapping;
      wall.name = "wall"

      wallR.name = "wallR"

      floor.material.normalMap.repeat.set(3, 3);
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
    },
    selectCase() {
      const vm = this
      const mouse = new Vector2();
      const raycaster = new Raycaster();

      this.$refs.canvas.addEventListener('pointerdown', onPointerDown);

      const recursiveFind = (obj) => {
        if (!obj || !obj.parent) return null
        const parent = obj.parent
        if (['angularBody', 'body'].includes(parent.name)) return parent
        else return recursiveFind(parent)
      }

      function onPointerDown(event) {
        const canvasPos = vm.$refs.canvas.getBoundingClientRect()
        mouse.x = ((event.clientX - canvasPos.x) / 800) * 2 - 1;
        mouse.y = -((event.clientY - canvasPos.y) / 600) * 2 + 1;

        raycaster.setFromCamera(mouse, vm.camera);

        const intersects = raycaster.intersectObjects(vm.scene.children, true);
        if (intersects.length > 0) {
          const object = intersects[0].object;
          // console.log(object.uuid)
          vm.selectedCase = recursiveFind(object)
        }
      }
    },
    openDoors() {
      if (this.selectedCase) {
        const { userData : { openedDoors } } = this.selectedCase
        if (this.selectedCase) this.selectedCase.userData.openedDoors = !openedDoors
      }
    }
  },
  mounted() {
    const vm = this
    vm.renderer.shadowMap.enabled = true;
    vm.renderer.setSize(windows.innerWidth, windows.innerHeight);
    this.$refs.canvas.appendChild(vm.renderer.domElement);

    this.initWalls()

    vm.camera.position.z = 80;

    let spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-60, 55, 60);
    vm.scene.add(spotLight);
    vm.scene.add(spotLight.target);

    vm.scene.add(vm.controlCase)

    spotLight.target.position.set(-10, 10, 10);

    vm.selectCase()

    vm.scene.rotation.y = threeMath.degToRad(26);

    vm.camera.position.set(-4, 16, 50);
    vm.camera.rotation.x = threeMath.degToRad(-20);

    spotLight.intensity = 1.5

    function fromTo(value, from, to, step) {
      if (value === to) return value;
      if (from < to) {
        if (value < to) {
          if (value + step < to) {
            return value + step;
          } else {
            return to;
          }
        }
      } else if (from > to) {
        if (value > to) {
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

      if (vm.selectedCase) {
        const group = vm.selectedCase.children.find(el => el.name === 'group')
        const leftDoor = group.children.find(el => el.name === 'leftDoor')
        const rightDoor = group.children.find(el => el.name === 'rightDoor')
        const { userData : { openedDoors } } = vm.selectedCase

        if (openedDoors) {

          leftDoor.rotation.y = fromTo(leftDoor.rotation.y, 0, threeMath.degToRad(-90), threeMath.degToRad(2.5));
          rightDoor.rotation.y = fromTo(rightDoor.rotation.y, 0, threeMath.degToRad(90), threeMath.degToRad(2.5));
        } else {
          leftDoor.rotation.y = fromTo(leftDoor.rotation.y, threeMath.degToRad(-90), 0, threeMath.degToRad(2.5));
          rightDoor.rotation.y = fromTo(rightDoor.rotation.y, threeMath.degToRad(90), 0, threeMath.degToRad(2.5));
        }
      }

      vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, threeMath.degToRad(vm.camPos.y), threeMath.degToRad(2.5));
      vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, vm.camPos.x, 1.57);
      // vm.camera.position.z = fromTo(vm.camera.position.y, vm.camera.position.y, threeMath.degToRad(vm.camPos.y), threeMath.degToRad(2.5));
      // vm.scene.rotation.y = fromTo(vm.scene.rotation.y, threeMath.degToRad(vm.camPos.x), threeMath.degToRad(vm.camPos.z), 0.01)
      // if (vm.scene.rotation.y > threeMath.degToRad(10))
      // vm.scene.rotation.y -= 0.01;

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
</style>
