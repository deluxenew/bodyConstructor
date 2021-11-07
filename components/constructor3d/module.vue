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
    div.buttons

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
    SpotLight,
    Vector2,
    Raycaster
  } = Three

  const windows = {innerHeight: 600, innerWidth: 800}

  let legsHeight = 1;
  let gapFacade = 0.1;
  let sideDepth = .3;
  let gapFromWall = sideDepth;

  import boxes from './CasesListConfig.js'

  const {boxAngularFloor, boxControl} = boxes

  export default {
    props: {
      caseConfig: {
        type: Object,
        default: () => {
        }
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
        return this.scene.children
            .filter(({name, place}) => ['bottomAngularBody', 'body'].includes(name) && place === 'bottomRight')
            .sort((a, b) => {
             if ( a.name < b.name) return 1
             if ( a.name > b.name) return -1
              return 0
            })
      },
      bottomRightWhiteoutAngular() {
        return this.scene.children.filter(({name, place}) => ['body'].includes(name) && place === 'bottomRight')
      },
      bottomLeft() {
        return this.scene.children.filter(({name, place}) => ['body'].includes(name) && place === 'bottomLeft')
      },
      bottomAngularCaseExist() {
        const angular = this.bottomRight.find(({name, place}) => name === 'bottomAngularBody' && place === 'bottomRight')
        return angular ? angular.userData : null
      },
      bottomPaddingRight() {
        const paddingCases = this.bottomRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width, padding}} = el
            if (padding)  acc += padding
            acc += width
          }
          return acc
        }, 0)
        return paddingCases
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
      camPos() {
        const vm = this

        function povSet(wL, wR, camAngle, camZ) {
          let alfa = Math.atan(wL / wR);
          let g = Math.sqrt(Math.pow(wL, 2) + Math.pow(wR, 2));
          let a = Math.pow(wL, 2) / g;
          let b = g - a;
          let h = Math.sqrt(a * b);
          let h2 = Math.tan(threeMath.degToRad(90 - camAngle / 2)) * g / 2 + h / 2;

          // vm.scene.rotation.y = threeMath.degToRad(90) - alfa;
          // vm.scene.position.x = (a - b) / 2;
          if (h2 > camZ) {
            vm.camera.position.z = h2;
          } else {
            vm.camera.position.z = camZ;
          }
        }

        const wr = vm.bottomRight.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
            acc += width
          }
          return acc
        }, 10)
        const wl = vm.bottomLeft.reduce((acc, el) => {
          if (el) {
            const {userData: {width}} = el
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
      },
      addBottomRight() {
        let addBottomRight = boxControl.clone()
        addBottomRight.name = 'addBottomRight'
        addBottomRight.rotation.y = threeMath.degToRad(-90);
        addBottomRight.userData.actionName = 'addBottomRightToScene'
        return addBottomRight
      },
      addBottomLeft() {
        let addBottomLeft = boxControl.clone()
        addBottomLeft.name = 'addBottomLeft'
        addBottomLeft.userData.actionName = 'addBottomLeftToScene'
        return addBottomLeft
      },
      isMoveRightActive() {
        const currentUuid = this.selectedCase?.uuid
        if (!currentUuid) return false
        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
        const rightIdx = this.bottomRightWhiteoutAngular.findIndex(({uuid}) => uuid === currentUuid)
        return (leftIdx > 0 && this.bottomLeft.length > 1) || (rightIdx > -1 && rightIdx < this.bottomRightWhiteoutAngular.length - 1 && this.bottomRightWhiteoutAngular.length > 1)
      },
      isMoveLeftActive() {
        const currentUuid = this.selectedCase?.uuid
        if (!currentUuid) return false
        const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === currentUuid)
        const rightIdx = this.bottomRightWhiteoutAngular.findIndex(({uuid}) => uuid === currentUuid)
        return (rightIdx > 0 && this.bottomRightWhiteoutAngular.length > 1) || (leftIdx > -1 && leftIdx < this.bottomLeft.length - 1 && this.bottomLeft.length > 1)
      },
      isAngularIsSelected() {
        return this.selectedCase?.name === 'bottomAngularBody'
      },
      isMaxRightPadding() {
        return this.bottomPaddingRight > 42
      },
      isMaxLeftPadding() {
        return this.bottomPaddingLeft > 40
      },
    },
    watch: {
      bottomPaddingRight() {
        const button = this.scene.children.find(({name}) => name === 'addBottomRight')
        if (this.isMaxRightPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addBottomRight)
        }
      },
      bottomPaddingLeft() {
        const button = this.scene.children.find(({name}) => name === 'addBottomLeft')
        if (this.isMaxLeftPadding) {
          this.scene.remove(button)
        } else if (!button) {
          this.scene.add(this.addBottomLeft)
        }
      }
      // selectedCase: {
      //   deep: true,
      //   handler(v) {
      //     const control = this.scene.children.find(el => el.name === 'control')
      //
      //     if (v) {
      //       control.rotation.y = v.rotation.y
      //       const left = v.userData.left
      //       let x, y, z
      //       if (left) {
      //         x = v.position.x - 2.4 + this.bottomPaddingRight
      //         y = 5
      //         z = 0
      //       } else {
      //         x = 0
      //         y = 5
      //         z = this.bottomPaddingRight
      //       }
      //
      //       control.position.set(x, y, z)
      //     }
      //   }
      // }
    },
    methods: {
      moveLeft() {

      },
      moveRight() {

      },
      removeCase() {
        const selectedObject = this.scene.getObjectByProperty('uuid', this.selectedCase.uuid);
        if (selectedObject && this.selectedCase) {
          if (this.selectedCase.name === 'bottomAngularBody' && this.bottomLeft.length && this.bottomRightWhiteoutAngular.length) return
          const leftIdx = this.bottomLeft.findIndex(({uuid}) => uuid === selectedObject.uuid)
          const rightIdx = this.bottomRight.findIndex(({uuid}) => uuid === selectedObject.uuid)
          const { width, padding, depth } = selectedObject.userData
          if (leftIdx > -1) {
            this.bottomLeft
                .filter((el, index) => index > leftIdx)
                .forEach((el) => {
                  const { x, y, z } = el.position
                  el.position.set(x + width, y, z);
            })
          }
          if (rightIdx > -1) {
            this.bottomRight
                .filter((el, index) => index > rightIdx)
                .forEach((el) => {
                  const { x, y, z } = el.position
                  el.position.set(x, y, z - width - (padding ? padding : 0));
            })
            if (selectedObject.name === 'bottomAngularBody') {
              this.bottomLeft
                  .filter((el, index) => index > leftIdx)
                  .forEach((el) => {
                    const { x, y, z } = el.position
                    el.position.set(x + depth, y, z);
                  })
            }
          }
          this.scene.remove(selectedObject);
          this.selectedCase = null
        }
      },
      swapCam() {
        if (this.positionNumber < 3) this.positionNumber += 1
        else this.positionNumber = 1
      },
      addAngularCaseBottom(body) {
        if (this.bottomAngularCaseExist) {
          console.log('Хватит угловых шкафов снизу');
          return
        }
        body.rotation.y = threeMath.degToRad(-90)
        const { depth, height, width, padding } =  body.userData
        body.position.set(-(depth / 2 + gapFromWall), height / 2 - legsHeight / 2, width / 2 + gapFromWall + 3.5);

        body.place = 'bottomRight'

        this.bottomLeft.forEach((el) => {
          const { x, y, z } = el.position
          el.position.set(x - body.userData.depth, y, z);
        })

        this.bottomRight.forEach((el) => {
          const { x, y, z } = el.position
          el.position.set(x, y, z + width + padding);
        })

        this.scene.add(body)
      },
      addBottomRightToScene() {
        let body = this.bodyCase.clone();
        body.userData.openedDoors = false
        body.place = 'bottomRight'

        if (body.name === 'bottomAngularBody') {

          this.addAngularCaseBottom(body)
          return
        }

        if (this.bottomLeft.length > 0 && !this.bottomAngularCaseExist) {
          let angular = boxAngularFloor
          this.addAngularCaseBottom(angular)
        }
        body.rotation.y = threeMath.degToRad(-90)
        body.position.set(-(body.userData.depth / 2 + gapFromWall), body.userData.height / 2 - legsHeight / 2, body.userData.width / 2 + gapFromWall + this.bottomPaddingRight);
        body.userData.left = false
        body.userData.top = false
        this.scene.add(body)
      },
      addBottomLeftToScene() {
        let body = this.bodyCase.clone();
        const { depth, height, width } =  body.userData
        body.userData.openedDoors = false
        body.place = 'bottomLeft'

        if (body.name === 'bottomAngularBody') {

          this.addAngularCaseBottom(body)
          return
        }

        if (this.bottomRight.length > 0 && !this.bottomAngularCaseExist) {
          this.addAngularCaseBottom(boxAngularFloor)
        }
        body.rotation.y = threeMath.degToRad(0)
        const needDepth = this.bottomRight[0] ? this.bottomRight[0].userData.depth + gapFacade : 0

        body.position.set(-(width / 2 + gapFromWall + this.bottomPaddingLeft + needDepth), height / 2 - legsHeight / 2, depth / 2 + gapFromWall);
        body.userData.left = true
        body.userData.top = false
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

        const recursiveFindBox = (obj) => {
          if (!obj || !obj.parent) return null
          const parent = obj.parent
          if (['bottomAngularBody', 'body'].includes(parent.name)) return parent
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

            if (controlActionName) {
              vm[controlActionName]()
            } else {

              vm.selectedCase = recursiveFindBox(object)
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
        this.scene.add(this.addBottomRight)
        this.scene.add(this.addBottomLeft)
      },
      setControlBoxesPosition() {
        const addBottomLeft = this.scene.getObjectByName('addBottomLeft')
        if (addBottomLeft) addBottomLeft.position.set(-6 - this.bottomPaddingLeft - (this.bottomRight[0] ? this.bottomRight[0].userData.depth : 0 ),5,1)
        const addBottomRight = this.scene.children.find(({name}) => name === 'addBottomRight')
        if (addBottomRight)  addBottomRight.position.set(-1,5, 6 + this.bottomPaddingRight +(this.bottomLeft[0] && !this.bottomRight[0] ? this.bottomLeft[0].userData.depth : 0 ))
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


      vm.addControlBoxes()

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

        vm.setControlBoxesPosition()



        vm.scene.children.filter((it) => it.userData.openedDoors !== undefined).forEach((it) => {
          const group = it.children.find(el => el.name === 'group')
          const leftDoor = group.children.find(el => el.name === 'leftDoor')
          const rightDoor = group.children.find(el => el.name === 'rightDoor')
          const {userData: {openedDoors}} = it

          if (openedDoors) {
            if (leftDoor) leftDoor.rotation.y = fromTo(leftDoor.rotation.y, 0, threeMath.degToRad(-90), threeMath.degToRad(2.5));
            if (rightDoor) rightDoor.rotation.y = fromTo(rightDoor.rotation.y, 0, threeMath.degToRad(90), threeMath.degToRad(2.5));
          } else {
            if (leftDoor) leftDoor.rotation.y = fromTo(leftDoor.rotation.y, threeMath.degToRad(-90), 0, threeMath.degToRad(2.5));
            if (rightDoor) rightDoor.rotation.y = fromTo(rightDoor.rotation.y, threeMath.degToRad(90), 0, threeMath.degToRad(2.5));
          }
        })

        vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, threeMath.degToRad(vm.camPos.y), threeMath.degToRad(2.5));
        vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, vm.camPos.x, 1.57);
        // vm.camera.position.z = fromTo(vm.camera.position.z, vm.camera.position.z, threeMath.degToRad(vm.camPos.z), threeMath.degToRad(2.5));
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
