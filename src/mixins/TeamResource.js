import TeamResource from '../resources/team'

export const TeamList = {
    data () {
        return {
            teamList: null,
        }
    },

    methods: {
        async getTeamList (sport, season) {
            let results = await TeamResource.list({ query: { sportIds: sport, season: season} })
            this.teamList = results.resources
        }
    }
}

export const TeamDetails = {
    data () {
        return {
            teamDetails: null,
        }
    },

    methods: {
        async getTeamDetails (sport, season) {
            this.teamDetails = await TeamResource.detail(this.id, { query: {  sportIds: sport, season: season } })
        }
    }
}
