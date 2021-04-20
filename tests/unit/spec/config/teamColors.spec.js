import { expect } from 'chai'
import { colors } from '@/config/teamColors.js'

describe('teamColors.js', () => {
  let defaultColors = {
    primary: 'white', 
    secondary: 'black'
  }
  it('default team colors match expected values', () => {
    expect(colors['default']).to.deep.equal(defaultColors);
  })
})
