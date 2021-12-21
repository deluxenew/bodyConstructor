<template lang="pug">
  div
    div.canvas(ref="canvas")

</template>


<script>
  import StartLoader from "./StartLoader";
  import Walls from "./models/Walls";
  import HelperFunctions from "./HelperFunctions";

  const {scene, renderer, spotLight, camera} = StartLoader
  const {floor, wallR, wall} = Walls
  const {fromTo, camPos} = HelperFunctions

  export default {
    name: "Canvas3d",
    props: {},
    data() {
      return {
        renderer: renderer(),
        spotLight: spotLight(),
        scene: scene(),
        camera: camera({canvasWidth: 800, canvasHeight: 600}),
        positionNumber: 1,
        selectedCase: null,
        showSizes: false,
        hash: null
      }
    },
    methods: {
      initWalls() {
        this.scene.add(floor);
        this.scene.add(wallR);
        this.scene.add(wall);
        this.scene.add(this.spotLight)
      },
    },
    mounted() {
      const vm = this
      // let worker = new Worker(require('./workers/WorkerAnimator.js'));
      // let scene = {data:'gggggg'}
      // worker.postMessage([scene.value]);
      //
      // worker.addEventListener("message", (evt) => {
      //   // console.log(evt.data, 'list');
      //   // scene = evt.data;
      //     // requestAnimationFrame(animationStep);
      // });
      //
      //

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvas.appendChild(this.renderer.domElement);
      this.initWalls()

      vm.camera.position.z = 80;
      vm.camera.position.y = 14;

      const camPosition = camPos(vm.positionNumber, 10, 10, 10, 10)
      vm.scene.rotation.y = camPosition.y
      vm.scene.position.x = camPosition.sPx
      vm.camera.position.x = camPosition.x
      vm.camera.position.z = camPosition.cPz

      function render() {

        // if (vm.scene.rotation.y !== camPosition.y
        //     && vm.scene.position.x !== camPosition.sPx
        //     && vm.camera.position.x !== camPosition.x
        //     && vm.camera.position.z !== camPosition.cPz
        // ) {
          requestAnimationFrame(render);
        // }
        // let steps = 13;
        // vm.scene.rotation.y = fromTo(vm.scene.rotation.y, vm.scene.rotation.y, camPosition.y, steps);
        // vm.scene.position.x = fromTo(vm.scene.position.x, vm.scene.position.x, camPosition.sPx, steps);
        // vm.camera.position.x = fromTo(vm.camera.position.x, vm.camera.position.x, camPosition.x, steps);
        // vm.camera.position.z = fromTo(vm.camera.position.z, vm.camera.position.z, camPosition.cPz, steps);
        vm.renderer.render(vm.scene, vm.camera);
      }

      render()
    }
  }
</script>

<style scoped lang="scss">
  .canvas {
    position: relative;
  }
</style>
