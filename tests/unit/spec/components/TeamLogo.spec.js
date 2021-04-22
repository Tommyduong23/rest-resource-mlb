import { shallowMount } from "@vue/test-utils"
import { expect } from "chai"

import TeamLogo from "@/components/TeamLogo"
import TeamResource from '@/resources/team'

let teamID = 0
let testTeam = new TeamResource({
    id: teamID,
})

describe("TeamLogo", () => {
    let props = {team: testTeam}
    it("has a TeamLogo image when mounted", () => {
        const wrapper = shallowMount(TeamLogo, {propsData: props})
        expect(wrapper.html()).to.include('//www.mlbstatic.com/team-logos/'+teamID+'.svg')
    })
})
