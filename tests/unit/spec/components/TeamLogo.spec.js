import { shallowMount } from "@vue/test-utils"
import { expect } from "chai"

import TeamLogo from "@/components/TeamLogo"

describe("TeamLogo", () => {
    let teamID = 0
    let props = {
        team: {
            attributes: {
                id: teamID
            }
        }
    }

    it("has a TeamLogo image when mounted", () => {
        const wrapper = shallowMount(TeamLogo, {propsData: props})
        expect(wrapper.html()).to.include('//www.mlbstatic.com/team-logos/'+teamID+'.svg')
    });
})
