import * as THREE from 'three'

export function mountShield(container) {
  const width = container.clientWidth
  const height = 240
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100)
  camera.position.set(0, 0, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5,5,5)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))

  const shieldShape = new THREE.Shape()
  shieldShape.moveTo(0, 1.5)
  shieldShape.bezierCurveTo(1.2, 1.2, 1.2, 0.4, 0.8, -0.2)
  shieldShape.bezierCurveTo(0.4, -0.9, -0.4, -0.9, -0.8, -0.2)
  shieldShape.bezierCurveTo(-1.2, 0.4, -1.2, 1.2, 0, 1.5)

  const geometry = new THREE.ExtrudeGeometry(shieldShape, { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 })
  const material = new THREE.MeshStandardMaterial({ color: 0x0d6efd, metalness: 0.3, roughness: 0.2 })
  const shield = new THREE.Mesh(geometry, material)
  scene.add(shield)

  function animate() {
    shield.rotation.y += 0.01
    shield.rotation.x = Math.sin(Date.now()/1000) * 0.1
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()

  function onResize() {
    const w = container.clientWidth
    renderer.setSize(w, height)
    camera.aspect = w/height
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    container.innerHTML = ''
  }
}


