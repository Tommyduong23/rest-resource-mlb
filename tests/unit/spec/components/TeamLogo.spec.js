import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'

import TeamLogo from '@/components/TeamLogo'
import TeamResource from '@/resources/team'

const teamID = 0
const testTeam = new TeamResource({
    id: teamID,
})

describe('components/TeamLogo.vue', () => {
    it('Props(team): displays TeamLogo image when mounted', () => {
        let props = {team: testTeam}
        let wrapper = shallowMount(TeamLogo, {propsData: props})

        let teamLogoComponentSrc = wrapper.find('v-img-stub').attributes('src')
        let teamLogoSrcString = '//www.mlbstatic.com/team-logos/'+teamID+'.svg'

        expect(teamLogoComponentSrc).to.equal(teamLogoSrcString)
    })
})
