import { expect } from 'chai'
import { colors } from '@/config/teamColors.js'

const defaultColors = {
  primary: 'white',
  secondary: 'black'
}

describe('config/teamColors.js', () => {
  it('Values(Default): contains correct default colors', () => {
    expect(colors['default']).to.deep.equal(defaultColors);
  })
})
