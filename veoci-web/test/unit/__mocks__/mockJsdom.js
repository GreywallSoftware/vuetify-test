/**
 * Functions and bits that don't exist in the jsdom implementation
 */

import 'jest-canvas-mock'

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: function () {}
})
