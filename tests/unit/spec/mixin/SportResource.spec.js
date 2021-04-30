import sinon from "sinon"
import flushPromises from 'flush-promises'
import { mount } from "@vue/test-utils"

import { SportList, SportDetails } from '@/mixins'
import { expect } from "chai"

describe('mixins/SportResource.js', (done) => {
    let server

    const apiReturnList = {
        "copyright": "Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "sports": [
            {
                "id": 1,
                "code": "mlb",
                "link": "/api/v1/sports/1",
                "name": "Major League Baseball",
                "abbreviation": "MLB",
                "sortOrder": 11,
                "activeStatus": true
            },
            {
                "id": 11,
                "code": "aaa",
                "link": "/api/v1/sports/11",
                "name": "Triple-A",
                "abbreviation": "AAA",
                "sortOrder": 101,
                "activeStatus": true
            },
            {
                "id": 12,
                "code": "aax",
                "link": "/api/v1/sports/12",
                "name": "Double-A",
                "abbreviation": "AA",
                "sortOrder": 201,
                "activeStatus": true
            }
        ]
    }

    const apiReturnDetails = {
        "copyright": "Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "sports": [
            {
                "id": 1,
                "code": "mlb",
                "link": "/api/v1/sports/1",
                "name": "Major League Baseball",
                "abbreviation": "MLB",
                "sortOrder": 11,
                "activeStatus": true
            }
        ]
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

    it('API(SportResourceMixin): retrieves list', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/sports",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnList)]
        )

        const SportListComponent = {
            render() {},
            mixins: [SportList]
        }
        const wrapper = mount(SportListComponent)

        expect(wrapper.vm.sportList).to.be.null
        await wrapper.vm.getSportList()

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.sportList.length).to.equal(3)
        expect(wrapper.vm.sportList.map(sport => sport.attributes.name)).to.deep.equal(['Major League Baseball', 'Triple-A', 'Double-A'])
    })

    it('API(TeamResourceMixin): retrieves detail', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/sports/1",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnDetails)]
        )

        const SportDetailComponent = {
            render() {},
            mixins: [SportDetails]
        }
        const wrapper = mount(SportDetailComponent)

        expect(wrapper.vm.sportDetails).to.be.null
        await wrapper.vm.getSportDetails('1')

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.sportDetails.attributes.name).to.equal('Major League Baseball')
    })
})
