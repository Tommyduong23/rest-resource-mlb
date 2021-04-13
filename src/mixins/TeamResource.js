import TeamResource from '../resources/team'

export const TeamList = {
    data () {
        return {
            teamList: null,
        }
    },

    methods: {
        async getTeamList (options = {}) {
            let results = await TeamResource.list({ ...options })
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
        async getTeamDetails (id, options = {}) {
            this.teamDetails = await TeamResource.detail(id, { ...options })
        }
    }
}
