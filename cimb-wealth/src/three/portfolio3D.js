import * as THREE from 'three'

export function mountDiversification(container, allocation) {
  const width = container.clientWidth
  const height = 260
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 100)
  camera.position.set(0, 2.5, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 0.8))
  const dir = new THREE.DirectionalLight(0xffffff, 0.6)
  dir.position.set(4,6,4)
  scene.add(dir)

  const colors = [0x0d6efd, 0x198754, 0x6610f2, 0xffc107, 0xdc3545]
  const total = allocation.reduce((s,a)=>s+a.value, 0)
  let startAngle = 0
  const group = new THREE.Group()
  allocation.forEach((a, i) => {
    const angle = (a.value/total) * Math.PI * 2
    const shape = new THREE.Shape()
    shape.moveTo(0,0)
    shape.absarc(0,0,2, startAngle, startAngle + angle, false)
    const geom = new THREE.ExtrudeGeometry(shape, { depth: 0.4, bevelEnabled: false })
    const mat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length] })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.rotation.x = -Math.PI/2
    mesh.userData = { label: a.label, value: a.value }
    group.add(mesh)
    startAngle += angle
  })
  scene.add(group)

  let hovered = null
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  function onMouseMove(e) {
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }
  renderer.domElement.addEventListener('mousemove', onMouseMove)

  function animate() {
    group.rotation.y += 0.005
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(group.children)
    if (hovered && (!intersects.length || intersects[0].object !== hovered)) {
      hovered.scale.set(1,1,1)
      hovered = null
    }
    if (intersects.length) {
      hovered = intersects[0].object
      hovered.scale.set(1.05, 1.05, 1.05)
    }
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


