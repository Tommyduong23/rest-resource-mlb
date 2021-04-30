import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import { mount, createLocalVue, TransitionStub } from "@vue/test-utils"
import { expect } from "chai"
import sinon from "sinon"
import flushPromises from 'flush-promises'

import SeasonSelect from "@/components/SeasonSelect"

// Due to Vuetify needing to be on the global Vue instance, this is needed
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

// Prevent error due to Vuetify being run in tests: https://github.com/vuejs/vue-test-utils/issues/974
global.requestAnimationFrame = function () {}

describe('components/SeasonSelect.vue', (done) => {
    let mountFunction, server
    let store, mutations, state // Vuex variables
    let vuetify

    const apiReturn = {
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
    // working mostly
    // const app = document.createElement('div')
    // app.setAttribute('data-app', true)
    // document.body.appendChild(app)

    beforeEach(() => {
        document.body.setAttribute('data-app', 'true')
        vuetify = new Vuetify()

        // TODO: Create factory function for creating the FakeServer
        // TODO: Use Regex for URL
        server = sinon.createFakeServer()
        server.respondImmediately = true
        server.respondWith("GET", "https://statsapi.mlb.com/api/v1/seasons/all?sportId=1&all=true",
            [200, { "Content-Type": "application/json" }, JSON.stringify(apiReturn)]
        )

        // Normally would put this in a separate Function (setupStore), but this is the only place this is tested
        mutations = {
            setSeason (state, season) {
              state.selectedSeason = season
            }
        }
        state = {
            selectedSeason: null,
        }

        store = new Vuex.Store({
            state,
            mutations,
        })

        mountFunction = (options = {}) => {
            return mount(SeasonSelect, {
                localVue,
                vuetify,
                store,
                ...options,
            })
        }
    })

    afterEach(() => {
        server.restore()
    })

    it('API(Seasons): retrieves list', async () => {
        const wrapper = mountFunction()

        // Waiting for async API call promise to resolve
        await flushPromises()

        expect(wrapper.vm.seasonList.map(season => season.attributes.seasonId)).to.deep.equal(['2021', '2020', '1876'])
        expect(wrapper.vm.selectedSeason).to.equal('2021')
    })
})
