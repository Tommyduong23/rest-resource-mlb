import LeagueResource from '../resources/league'

export const LeagueList = {
    data () {
        return {
            leagueList: null,
        }
    },

    methods: {
        async getLeagueList (options = {}) {
            let results = await LeagueResource.list({ ...options })
            this.leagueList = results.resources
        }
    }
}

export const LeagueDetails = {
    data () {
        return {
            leagueDetails: null,
        }
    },

    methods: {
        async getLeagueDetails (id, options = {}) {
            this.leagueDetails = await LeagueResource.detail(id, { ...options })
        }
    }
}
