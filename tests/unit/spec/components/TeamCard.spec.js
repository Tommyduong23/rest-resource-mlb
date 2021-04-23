import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'

import TeamCard from '@/components/TeamCard'
import TeamResource from '@/resources/team'
import DivisionResource from '@/resources/division'

const teamID = 1
const teamName = "Test Team"
const teamLocation = "Test City"
const teamDivisionID = 1
const teamDivisionName = 'Test Division West'
const teamDivisionAbbreviation = 'TDW'

describe('components/TeamCard.vue', () => {
    function wrapperFactory({ propsData } = {}) {
        return shallowMount(TeamCard, {
            propsData: {...propsData},
        })
    }

    const preDivisionTeam = new TeamResource({
        id: teamID,
        teamName: teamName,
        locationName: teamLocation,
    })

    it('Props(team): creates team card without division', () => {
        const wrapper = wrapperFactory({propsData: {team: preDivisionTeam}})

        const teamCardTitleText = wrapper.find('v-card-title-stub').text()
        expect(teamCardTitleText).to.equal(preDivisionTeam.get('teamName'))

        const teamCardLocationText = wrapper.find('v-card-subtitle-stub').text()
        expect(teamCardLocationText).to.equal(preDivisionTeam.get('locationName'))

        const teamCardDivisionText = wrapper.find('v-card-text-stub')
        expect(teamCardDivisionText.exists()).to.be.false
    })

    const postDivisionTeam = new TeamResource({
        id: teamID,
        teamName: teamName,
        locationName: teamLocation,
        division: teamDivisionID,
    })
    const teamDivisionObject = new DivisionResource({
        id: teamDivisionID,
        name: teamDivisionName,
        abbreviation: teamDivisionAbbreviation,
    })

    it('Props(team): creates team card with division', async () => {
        await postDivisionTeam.resolveAttribute('division.abbreviation')
        const wrapper = wrapperFactory({propsData: {team: postDivisionTeam}})

        const teamCardTitleText = wrapper.find('v-card-title-stub').text()
        expect(teamCardTitleText).to.equal(postDivisionTeam.get('teamName'))

        const teamCardLocationText = wrapper.find('v-card-subtitle-stub').text()
        expect(teamCardLocationText).to.equal(postDivisionTeam.get('locationName'))

        const teamCardDivisionText = wrapper.find('v-card-text-stub').text()
        expect(teamCardDivisionText).to.equal(teamDivisionObject.get('abbreviation'))
    })
})
