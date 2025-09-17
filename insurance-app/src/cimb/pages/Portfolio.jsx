import { useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import * as THREE from 'three'
import { investments } from '../data'

function mount3D(container) {
  const width = container.clientWidth
  const height = 260
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

  const materials = [0xdc3545,0x6c757d,0x0d6efd,0x198754].map(c => new THREE.MeshStandardMaterial({ color: c, metalness: 0.3, roughness: 0.2 }))
  const total = investments.reduce((s,i)=>s+i.value,0)
  let angle = 0
  const radius = 1.5
  investments.forEach((inv, idx) => {
    const portion = inv.value / total
    const heightSeg = 1 + portion * 3
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, heightSeg, 24)
    const mesh = new THREE.Mesh(geometry, materials[idx % materials.length])
    mesh.position.set(Math.cos(angle)*radius, heightSeg/2 - 1, Math.sin(angle)*radius)
    angle += Math.PI * 2 * portion
    scene.add(mesh)
  })

  function animate() {
    scene.rotation.y += 0.004
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

export default function Portfolio() {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) return mount3D(ref.current)
  }, [])

  const columns = [
    { field: 'asset', headerName: 'Asset', filter: true },
    { field: 'ticker', headerName: 'Ticker' },
    { field: 'quantity', headerName: 'Qty' },
    { field: 'price', headerName: 'Price' },
    { field: 'value', headerName: 'Value' },
    { field: 'sector', headerName: 'Sector' },
  ]

  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">3D Allocation</div>
          <div className="card-body"><div ref={ref} style={{ height: 260 }} /></div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">Holdings</div>
          <div className="card-body p-0">
            <div className="ag-theme-quartz" style={{ height: 300 }}>
              <AgGridReact rowData={investments} columnDefs={columns} pagination={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


