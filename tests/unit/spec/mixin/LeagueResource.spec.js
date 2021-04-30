import sinon from "sinon"
import flushPromises from 'flush-promises'
import { mount } from "@vue/test-utils"

import { LeagueList, LeagueDetails } from '@/mixins'
import { expect } from "chai"

describe('mixins/LeagueResource.js', (done) => {
    let server

    const apiReturnList = {
        "copyright": "Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "leagues": [
            {
                "id": 100,
                "name": "American Association",
                "link": "/api/v1/league/100",
                "abbreviation": "AA",
                "seasonState": "offseason",
                "hasWildCard": false,
                "hasSplitSeason": false,
                "numTeams": 9,
                "seasonDateInfo": {
                    "seasonId": "1891",
                    "regularSeasonStartDate": "1891-04-08",
                    "regularSeasonEndDate": "1891-10-06",
                    "preSeasonStartDate": "1891-01-01"
                },
                "season": "1891",
                "orgCode": "AA",
                "conferencesInUse": false,
                "divisionsInUse": false,
                "sport": {
                    "id": 1,
                    "link": "/api/v1/sports/1"
                },
                "sortOrder": 2811,
                "active": false
            },
            {
                "id": 101,
                "name": "Union Association",
                "link": "/api/v1/league/101",
                "abbreviation": "UA",
                "seasonState": "offseason",
                "hasWildCard": false,
                "hasSplitSeason": false,
                "numTeams": 12,
                "seasonDateInfo": {
                    "seasonId": "1884",
                    "regularSeasonStartDate": "1884-04-17",
                    "regularSeasonEndDate": "1884-10-19",
                    "preSeasonStartDate": "1884-01-01"
                },
                "season": "1884",
                "orgCode": "UA",
                "conferencesInUse": false,
                "divisionsInUse": false,
                "sport": {
                    "id": 1,
                    "link": "/api/v1/sports/1"
                },
                "sortOrder": 2841,
                "active": false
            },
            {
                "id": 102,
                "name": "National Association",
                "link": "/api/v1/league/102",
                "abbreviation": "NA",
                "seasonState": "offseason",
                "hasWildCard": false,
                "hasSplitSeason": false,
                "numTeams": 13,
                "seasonDateInfo": {
                    "seasonId": "1875",
                    "regularSeasonStartDate": "1875-04-19",
                    "regularSeasonEndDate": "1875-10-30",
                    "preSeasonStartDate": "1875-01-01"
                },
                "season": "1875",
                "orgCode": "NA",
                "conferencesInUse": false,
                "divisionsInUse": false,
                "sport": {
                    "id": 6,
                    "link": "/api/v1/sports/6"
                },
                "sortOrder": 2821,
                "active": false
            },
            {
                "id": 103,
                "name": "American League",
                "link": "/api/v1/league/103",
                "abbreviation": "AL",
                "nameShort": "American",
                "seasonState": "inseason",
                "hasWildCard": true,
                "hasSplitSeason": false,
                "numGames": 162,
                "hasPlayoffPoints": false,
                "numTeams": 15,
                "numWildcardTeams": 2,
                "seasonDateInfo": {
                    "seasonId": "2021",
                    "regularSeasonStartDate": "2021-04-01",
                    "regularSeasonEndDate": "2021-10-03",
                    "preSeasonStartDate": "2021-02-28",
                    "preSeasonEndDate": "2021-03-30",
                    "postSeasonStartDate": "2021-10-04",
                    "postSeasonEndDate": "2021-10-31",
                    "lastDate1stHalf": "2021-07-11",
                    "firstDate2ndHalf": "2021-07-15",
                    "allStarDate": "2021-07-13"
                },
                "season": "2021",
                "orgCode": "AL",
                "conferencesInUse": false,
                "divisionsInUse": true,
                "sport": {
                    "id": 1,
                    "link": "/api/v1/sports/1"
                },
                "sortOrder": 21,
                "active": true
            },
            {
                "id": 104,
                "name": "National League",
                "link": "/api/v1/league/104",
                "abbreviation": "NL",
                "nameShort": "National",
                "seasonState": "inseason",
                "hasWildCard": true,
                "hasSplitSeason": false,
                "numGames": 162,
                "hasPlayoffPoints": false,
                "numTeams": 15,
                "numWildcardTeams": 2,
                "seasonDateInfo": {
                    "seasonId": "2021",
                    "regularSeasonStartDate": "2021-04-01",
                    "regularSeasonEndDate": "2021-10-03",
                    "preSeasonStartDate": "2021-02-28",
                    "preSeasonEndDate": "2021-03-30",
                    "postSeasonStartDate": "2021-10-04",
                    "postSeasonEndDate": "2021-10-31",
                    "lastDate1stHalf": "2021-07-11",
                    "firstDate2ndHalf": "2021-07-15",
                    "allStarDate": "2021-07-13"
                },
                "season": "2021",
                "orgCode": "NL",
                "conferencesInUse": false,
                "divisionsInUse": true,
                "sport": {
                    "id": 1,
                    "link": "/api/v1/sports/1"
                },
                "sortOrder": 31,
                "active": true
            }
        ]
      }

    const apiReturnDetails = {
        "copyright": "Copyright 2021 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
        "leagues": [
            {
                "id": 103,
                "name": "American League",
                "link": "/api/v1/league/103",
                "abbreviation": "AL",
                "nameShort": "American",
                "seasonState": "inseason",
                "hasWildCard": true,
                "hasSplitSeason": false,
                "numGames": 162,
                "hasPlayoffPoints": false,
                "numTeams": 15,
                "numWildcardTeams": 2,
                "seasonDateInfo": {
                "seasonId": "2021",
                    "regularSeasonStartDate": "2021-04-01",
                    "regularSeasonEndDate": "2021-10-03",
                    "preSeasonStartDate": "2021-02-28",
                    "preSeasonEndDate": "2021-03-30",
                    "postSeasonStartDate": "2021-10-04",
                    "postSeasonEndDate": "2021-10-31",
                    "lastDate1stHalf": "2021-07-11",
                    "firstDate2ndHalf": "2021-07-15",
                    "allStarDate": "2021-07-13"
                },
                "season": "2021",
                "orgCode": "AL",
                "conferencesInUse": false,
                "divisionsInUse": true,
                "sport": {
                    "id": 1,
                    "link": "/api/v1/sports/1"
                },
                "sortOrder": 21,
                "active": true
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

    it('API(LeagueResourceMixin): retrieves list', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/league",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnList)]
        )

        const LeagueListComponent = {
            render() {},
            mixins: [LeagueList]
        }
        const wrapper = mount(LeagueListComponent)

        expect(wrapper.vm.leagueList).to.be.null
        await wrapper.vm.getLeagueList()

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.leagueList.length).to.equal(5)
        expect(wrapper.vm.leagueList.map(team => team.attributes.name)).to.deep.equal(['American Association', 'Union Association', 'National Association', 'American League', 'National League'])
    })

    it('API(LeagueResourceMixin): retrieves detail', async () => {
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/league/103",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturnDetails)]
        )

        const LeagueDetailComponent = {
            render() {},
            mixins: [LeagueDetails]
        }
        const wrapper = mount(LeagueDetailComponent)

        expect(wrapper.vm.leagueDetails).to.be.null
        await wrapper.vm.getLeagueDetails('103')

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.leagueDetails.attributes.name).to.equal('American League')
    })
})
