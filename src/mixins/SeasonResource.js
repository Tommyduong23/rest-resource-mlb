import SeasonResource from '../resources/season'

export const SeasonList = {
    data () {
        return {
            seasonList: null,
        }
    },

    methods: {
        async getSeasonList (options = {}) {
            let results = await SeasonResource.list({ ...options })

            this.seasonList = results.resources.sort((a, b) => {
                return b.attributes.seasonId - a.attributes.seasonId
            })
        }
    }
}

export const SeasonDetails = {
    data () {
        return {
            seasonDetails: null,
        }
    },

    methods: {
        async getSeasonDetails (id, options = {}) {
            this.seasonDetails = await SeasonResource.detail(id, { ...options })
        }
    }
}
