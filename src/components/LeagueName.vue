<template>
  <div
    v-if="league"
  >
    {{ league.attributes.name }}
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
  import Vue from 'vue'

  import LeagueResource from '../resources/league'

  export default Vue.extend({
    name: 'LeagueName',

    props: {
        id: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        league: null
    }),

    async mounted () {
        this.league = await LeagueResource.detail(this.id)
    }
  })
</script>