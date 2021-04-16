import SportResource from '../resources/sport'

export const SportList = {
    data () {
        return {
            sportList: null,
        }
    },

    methods: {
        async getSportList (options = {}) {
            let results = await SportResource.list({ ...options })
            this.sportList = results.resources
        }
    }
}

export const SportDetails = {
    data () {
        return {
            sportDetails: null,
        }
    },

    methods: {
        async getSportDetails (id, options = {}) {
            this.sportDetails = await SportResource.detail(id, { ...options })
        }
    }
}
