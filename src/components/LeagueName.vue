<template>
  <div
    v-if="league"
    :class="isHeader ? 'league-header' : 'league-tag'"
  >
    {{ isHeader ? league.attributes.name : league.attributes.abbreviation }}
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
        isHeader: Boolean,
    },

    data: () => ({
        league: null
    }),

    async mounted () {
        this.league = await LeagueResource.detail(this.id)
    }
  })
</script>

<style scoped>
  .league-header {
    padding: 10px;
    font-weight: bold;
  }
</style>