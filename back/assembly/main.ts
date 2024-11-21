// save assembly.ts manifold to out.glb and out.gltf
import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'
import { exportModels } from '../lib/manifold/worker'
import Module from '../lib/manifold/built/manifold'
export const manifoldModule = await Module()
import { assembly } from './assembly'

manifoldModule.setup()
const defaults = {
  roughness: 1,
  metallic: .25,
  baseColorFactor: [0.55, .9, .55],
  alpha: 1,
  unlit: false,
  animationLength: 1,
  animationMode: 'loop'
}
async function run_and_save(fn: any) {
  const result = await exportModels(defaults as any, fn(manifoldModule))
  if (result) {
    const write_format = async (url, file, role) => {
      const response = await fetch(url)
      const buffer = await response.arrayBuffer()
      const path_file = path.join('./', file)
      fs.writeFileSync(path_file, Buffer.from(buffer))
      console.log(`/${path_file} updated - for ${role}`)
    }
    await write_format(result.glbURL, 'front/out.glb', 'web view')
    await write_format(result.threeMFURL, 'out.3mf', 'printing')
  }
}

run_and_save(assembly)
