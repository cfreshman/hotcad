import { ManifoldToplevel } from '../../lib/manifold/built/manifold'

export const part_pyramid = (manifold: ManifoldToplevel) => {
  const m = manifold.Manifold
  return m.cylinder(1, 1 / Math.SQRT2, 0, 4, true).translate([0, 0, .5]).rotate([0, 0, 45])
}
