import { ManifoldToplevel } from '../../lib/manifold/built/manifold'

export const part_pico_w = (manifold: ManifoldToplevel) => {
  const m = manifold.Manifold

  const shapes = []
  const sx = 51
  const sy = 21
  const sz = 1
  const tol = .1

  {
    // board
    let board = m.cube([sx, sy, sz])

    {
      // pin holes
      const rh = 1/2 + tol
      const startx = (51 - 48.26) / 2
      const starty = (21 - 17.78) / 2
      for (let y = starty; y < sy; y += 17.78) {
        for (let x = startx; x < sx; x += 2.54) {
          let hole = m.cylinder(sz, rh, rh, 100).translate([x, y, 0])
          board = board.subtract(hole)
        }
      }
    }
    {
      // pin halves
      const rh = 1/2 + tol
      const startx = (51 - 48.26) / 2
      const starty = 0
      for (let y = starty; y <= sy; y += 21) {
        for (let x = startx; x < sx; x += 2.54) {
          let hole = m.cylinder(sz, rh, rh, 100).translate([x, y, 0])
          board = board.subtract(hole)
        }
      }
    }
    {
      // mounting holes
      const rh = 2.1/2 + tol
      const startx = 2
      const starty = (21 - 11.4) / 2
      for (let y = starty; y < sy; y += 11.4) {
        for (let x = startx; x < sx; x += (51 - 2*2)) {
          let hole = m.cylinder(sz, rh, rh, 100).translate([x, y, 0])
          board = board.subtract(hole)
        }
      }
    }
    {
      const plug = m.cube([6, 8, 4]).translate([-1.8, sy/2 - 4, 0])
      board = board.add(plug)
    }
    {
      const startxcomponents = 5.5 - 1.3
      const components = m.cube([sx - startxcomponents * 2, 14, 3]).translate([startxcomponents, sy/2 - 7, 0])
      board = board.add(components)
    }
    {
      const bootbutton = m.cube([3, 3, 4.5]).translate([2.54 * 4, sy/2 - 4, 0])
      board = board.add(bootbutton)
    }

    shapes.push(board)
  }

  return shapes.reduce((a, b) => m.union(a, b)).translate([-sx/2, -sy/2, 0])
}
