import sinon from "sinon"
import flushPromises from 'flush-promises'
import { mount } from "@vue/test-utils"

import { TeamList, TeamDetails } from '@/mixins'
import { expect } from "chai"

describe('mixins/TeamResource.js', (done) => {
    let server

    const apiReturnList = {
        "copyright":"Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "teams": [
            {
                "id": 133,
                "name": "Oakland Athletics",
                "link": "/teams/133",
                "season": 2021,
                "venue": {
                    "id": 10,
                    "name": "Oakland Coliseum",
                    "link": "/venues/10"
                },
                "springVenue": {
                    "id": 2507,
                    "link": "/venues/2507"
                },
                "teamCode": "oak",
                "fileCode": "oak",
                "abbreviation": "OAK",
                "teamName": "Athletics",
                "locationName": "Oakland",
                "firstYearOfPlay": "1901",
                "league": {
                    "id": 103,
                    "name": "Secondary League",
                    "link": "/league/103"
                },
                "division": {
                    "id": 200,
                    "name": "Secondary League West",
                    "link": "/divisions/200"
                },
                "sport": {
                    "id": 1,
                    "link": "/sports/1",
                    "name": "Major League Baseball"
                },
                "shortName": "Oakland",
                "springLeague": {
                    "id": 114,
                    "name": "Cactus League",
                    "link": "/league/114",
                    "abbreviation": "CL"
                },
                "allStarStatus": "N",
                "active": true
            },
            {
                "id": 134,
                "name": "Pittsburgh Pirates",
                "link": "/teams/134",
                "season": 2021,
                "venue": {
                    "id": 31,
                    "name": "PNC Park",
                    "link": "/venues/31"
                },
                "springVenue": {
                    "id": 2526,
                    "link": "/venues/2526"
                },
                "teamCode": "pit",
                "fileCode": "pit",
                "abbreviation": "PIT",
                "teamName": "Pirates",
                "locationName": "Pittsburgh",
                "firstYearOfPlay": "1882",
                "league": {
                    "id": 104,
                    "name": "Primary League",
                    "link": "/league/104"
                },
                "division": {
                    "id": 205,
                    "name": "Primary League Central",
                    "link": "/divisions/205"
                },
                "sport": {
                    "id": 1,
                    "link": "/sports/1",
                    "name": "Major League Baseball"
                },
                "shortName": "Pittsburgh",
                "springLeague": {
                    "id": 115,
                    "name": "Grapefruit League",
                    "link": "/league/115",
                    "abbreviation": "GL"
                },
                "allStarStatus": "N",
                "active": true
            },
            {
                "id": 135,
                "name": "San Diego Padres",
                "link": "/teams/135",
                "season": 2021,
                "venue": {
                    "id": 2680,
                    "name": "Petco Park",
                    "link": "/venues/2680"
                },
                "springVenue": {
                    "id": 2530,
                    "link": "/venues/2530"
                },
                "teamCode": "sdn",
                "fileCode": "sd",
                "abbreviation": "SD",
                "teamName": "Padres",
                "locationName": "San Diego",
                "firstYearOfPlay": "1968",
                "league": {
                    "id": 104,
                    "name": "Primary League",
                    "link": "/league/104"
                },
                "division": {
                    "id": 203,
                    "name": "Primary League West",
                    "link": "/divisions/203"
                },
                "sport": {
                    "id": 1,
                    "link": "/sports/1",
                    "name": "Major League Baseball"
                },
                "shortName": "San Diego",
                "springLeague": {
                    "id": 114,
                    "name": "Cactus League",
                    "link": "/league/114",
                    "abbreviation": "CL"
                },
                "allStarStatus": "N",
                "active": true
            }
        ]
    }

    const apiReturnDetails = {
        "copyright":"Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "teams":[
            {
                "id":133,
                "name":"Oakland Athletics",
                "link":"/api/v1/teams/133",
                "season":2021,
                "venue": {
                    "id":10,
                    "name":"Oakland Coliseum",
                    "link":"/api/v1/venues/10"
                },
                "springVenue": {
                    "id":2507,
                    "link":"/api/v1/venues/2507"
                },
                "teamCode":"oak",
                "fileCode":"oak",
                "abbreviation":"OAK",
                "teamName":"Athletics",
                "locationName":"Oakland",
                "firstYearOfPlay":"1901",
                "league": {
                    "id":103,
                    "name":"American League",
                    "link":"/api/v1/league/103"
                },
                "division": {
                    "id":200,
                    "name":"American League West",
                    "link":"/api/v1/divisions/200"
                },
                "sport":{
                    "id":1,
                    "link":"/api/v1/sports/1",
                    "name":"Major League Baseball"
                },
                "shortName":"Oakland",
                "springLeague": {
                    "id":114,"name":"Cactus League",
                    "link":"/api/v1/league/114",
                    "abbreviation":"CL"
                },
                "allStarStatus":"N",
                "active":true
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

    it('API(TeamResourceMixin): retrieves list', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/teams?sportId=1",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnList)]
        )

        const TeamListComponent = {
            render() {},
            mixins: [TeamList]
        }
        const wrapper = mount(TeamListComponent)

        expect(wrapper.vm.teamList).to.be.null
        await wrapper.vm.getTeamList({ query: { sportId: '1'} })

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.teamList.length).to.equal(3)
        expect(wrapper.vm.teamList.map(team => team.attributes.name)).to.deep.equal(['Oakland Athletics', 'Pittsburgh Pirates', 'San Diego Padres'])
    })

    it('API(TeamResourceMixin): retrieves detail', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/teams/133?sportId=1",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnDetails)]
        )

        const TeamDetailComponent = {
            render() {},
            mixins: [TeamDetails]
        }
        const wrapper = mount(TeamDetailComponent)

        expect(wrapper.vm.teamDetails).to.be.null
        await wrapper.vm.getTeamDetails('133', { query: { sportId: '1'} })

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.teamDetails.attributes.name).to.equal('Oakland Athletics')
    })
})
