<template>
  <div ref="container" class="three-container" @mousemove="onMouseMove" @click="onClick"></div>
</template>

<script>
import * as THREE from 'three'
import { onMounted, onBeforeUnmount, ref } from 'vue'

export default {
  name: 'ThreeScene',
  emits: ['element-click'],
  setup(_, { emit }) {
    const container = ref(null)
    let scene, camera, renderer, animationId
    let cube, sphere, raycaster, mouse
    let scrollTargetZ = 5

    const init = () => {
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0e1726)

      const width = container.value.clientWidth
      const height = container.value.clientHeight

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
      camera.position.set(0, 1, 8)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.value.appendChild(renderer.domElement)

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0)
      hemiLight.position.set(0, 20, 0)
      scene.add(hemiLight)

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
      dirLight.position.set(5, 10, 7.5)
      scene.add(dirLight)

      const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2)
      const cubeMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.3, roughness: 0.4 })
      cube = new THREE.Mesh(cubeGeo, cubeMat)
      cube.position.set(-1.8, 0.8, 0)
      cube.name = 'projects'
      scene.add(cube)

      const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32)
      const sphereMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, metalness: 0.2, roughness: 0.5 })
      sphere = new THREE.Mesh(sphereGeo, sphereMat)
      sphere.position.set(1.8, -0.2, 0)
      sphere.name = 'experience'
      scene.add(sphere)

      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2(0, 0)

      window.addEventListener('resize', onResize)
      window.addEventListener('scroll', onScroll, { passive: true })

      animate()
    }

    const onResize = () => {
      if (!container.value) return
      const width = container.value.clientWidth
      const height = container.value.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const onScroll = () => {
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const t = window.scrollY / maxScroll
      // Map scroll to camera Z and Y
      scrollTargetZ = 5 + t * 6
      camera.position.y = 1 + t * 1.5
      // Scroll affects rotations
      cube.rotation.y = t * Math.PI * 2
      sphere.rotation.x = t * Math.PI * 2
    }

    const onMouseMove = (e) => {
      if (!container.value) return
      const rect = container.value.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouse.x = x * 2 - 1
      mouse.y = -(y * 2 - 1)
      // Parallax camera slight movement
      camera.position.x = (mouse.x) * 0.8
      camera.lookAt(0, 0, 0)

      // Hover highlight via raycaster
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([cube, sphere])
      ;[cube, sphere].forEach(obj => obj.scale.set(1, 1, 1))
      if (intersects.length) {
        const target = intersects[0].object
        target.scale.set(1.15, 1.15, 1.15)
      }
    }

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([cube, sphere])
      if (intersects.length) {
        emit('element-click', intersects[0].object.name)
      }
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      // Idle rotation
      cube.rotation.x += 0.005
      sphere.rotation.y += 0.006
      // Smooth camera z towards scroll target
      camera.position.z += (scrollTargetZ - camera.position.z) * 0.08
      renderer.render(scene, camera)
    }

    onMounted(() => init())
    onBeforeUnmount(() => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss?.()
      }
    })

    return { container, onMouseMove, onClick }
  }
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 420px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .three-container { height: 320px; }
}
</style>


