import sinon from "sinon"
import flushPromises from 'flush-promises'
import { mount } from "@vue/test-utils"

import { SeasonList, SeasonDetails} from '@/mixins'
import { expect } from "chai"

describe('mixins/SeasonResource.js', (done) => {
    let server

    const apiReturnList = {
        "copyright": "Copyright Text Here",
        "seasons": [
            {
                "seasonId": "1876",
                "hasWildcard": false,
                "regularSeasonStartDate": "1876-04-22",
                "regularSeasonEndDate": "1876-10-09",
                "preSeasonStartDate": "1876-01-01",
                "seasonStartDate": "1876-04-22",
                "seasonEndDate": "1876-10-09"
            },
            {
                "seasonId": "2020",
                "hasWildcard": true,
                "regularSeasonStartDate": "2020-07-23",
                "regularSeasonEndDate": "2020-09-27",
                "preSeasonStartDate": "2020-02-21",
                "preSeasonEndDate": "2020-07-22",
                "postSeasonStartDate": "2020-09-29",
                "postSeasonEndDate": "2020-10-28",
                "lastDate1stHalf": "2020-08-25",
                "firstDate2ndHalf": "2020-08-26",
                "seasonStartDate": "2020-07-23",
                "seasonEndDate": "2020-10-28"
            },
            {
                "seasonId": "2021",
                "hasWildcard": true,
                "regularSeasonStartDate": "2021-04-01",
                "regularSeasonEndDate": "2021-10-03",
                "preSeasonStartDate": "2021-02-28",
                "preSeasonEndDate": "2021-03-30",
                "postSeasonStartDate": "2021-10-04",
                "postSeasonEndDate": "2021-10-31",
                "lastDate1stHalf": "2021-07-11",
                "firstDate2ndHalf": "2021-07-15",
                "allStarDate": "2021-07-13",
                "seasonStartDate": "2021-02-28",
                "seasonEndDate": "2021-10-31"
            },
        ],
    }

    const apiReturnDetails = {
        "copyright": "Copyright Text Here",
        "seasons": [
            {
                "seasonId": "2020",
                "hasWildcard": true,
                "regularSeasonStartDate": "2020-07-23",
                "regularSeasonEndDate": "2020-09-27",
                "preSeasonStartDate": "2020-02-21",
                "preSeasonEndDate": "2020-07-22",
                "postSeasonStartDate": "2020-09-29",
                "postSeasonEndDate": "2020-10-28",
                "lastDate1stHalf": "2020-08-25",
                "firstDate2ndHalf": "2020-08-26",
                "seasonStartDate": "2020-07-23",
                "seasonEndDate": "2020-10-28"
            },
        ],
    }

    beforeEach(() => {
        // TODO: Create factory function for creating the FakeServer
        // TODO: Use Regex for URL
        server = sinon.createFakeServer()
        server.respondImmediately = true
    })

    afterEach(() => {
        server.restore()
    })

    it('API(SeasonSelectMixin): retrieves list', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/seasons/all?sportId=1&all=true",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnList)]
        )

        const SeasonListComponent = {
            render() {},
            mixins: [SeasonList]
        }
        const wrapper = mount(SeasonListComponent)

        expect(wrapper.vm.seasonList).to.be.null
        await wrapper.vm.getSeasonList({ query: { sportId: '1', all: 'true'} })

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.seasonList.length).to.equal(3)
        expect(wrapper.vm.seasonList.map(season => season.attributes.seasonId)).to.deep.equal(['2021', '2020', '1876'])
    })

    it('API(SeasonSelectMixin): retrieves detail', async () => {
        // Due to MLB's odd URL scheme for this resource, We have to fake the URL of /seasons/all to make this pass
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/seasons/all/2020?sportId=1",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnDetails)]
        )

        const SeasonDetailComponent = {
            render() {},
            mixins: [SeasonDetails]
        }
        const wrapper = mount(SeasonDetailComponent)

        expect(wrapper.vm.seasonDetails).to.be.null
        await wrapper.vm.getSeasonDetails(2020, { query: { sportId: '1'} })

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.seasonDetails.attributes.seasonId).to.equal('2020')
    })
})
