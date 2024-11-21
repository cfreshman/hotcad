import { ManifoldToplevel } from '../../lib/manifold//built/manifold'

export const part_cube = (manifold: ManifoldToplevel) => {
  const { cube } = manifold.Manifold
  return cube([10, 10, 10])
}
