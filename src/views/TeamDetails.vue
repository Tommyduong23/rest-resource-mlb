<template>
  <mlb-base
    :team="teamDetails ? teamDetails.attributes.id : 0"
  >
    <template #page-title>
      {{ teamDetails ? teamDetails.attributes.name : "Loading..." }}
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <template v-if="teamDetails">
      <mlb-team-logo
        :id="teamDetails.attributes.id"
        height="200px"
      />
      <v-expansion-panels 
        v-model="meta.expandedPanel"
        accordion
      >
        <template v-for="(teamComponent, idx) in meta.teamComponents">
          <component
            :is="`team-details-${teamComponent}`"
            :key="idx"
            v-bind="{teamDetails: teamDetails, selectedSeason: selectedSeason,}"
          />
        </template>
      </v-expansion-panels>
    </template>
    <div v-else>
      Loading...
    </div>
  </mlb-base>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'

  import { TeamDetails } from '../mixins'

  import TeamDetailsRoster from '../components/TeamDetailsRoster'
  import TeamDetailsCoaches from '../components/TeamDetailsCoaches'
  import TeamDetailsHistory from '../components/TeamDetailsHistory'

  export default Vue.extend({
    components: {
        TeamDetailsRoster,
        TeamDetailsCoaches,
        TeamDetailsHistory,
    },

    mixins: [TeamDetails],

    props: {
        id: {
            type: Number,
            required: true,
        },
    },

    data: () => (
      {
        meta: {
          expandedPanel: 0,
          teamComponents: [
            "roster",
            "coaches",
            "history",
          ],
        },
      }
    ),

    computed: mapState([
        'selectedSeason'
    ]),

    watch: {
      selectedSeason () {
        this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.selectedSeason} } )
      },
    },

    async mounted() {
      if (this.selectedSeason) {
        this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.selectedSeason} } )
      }
    },
  })
</script>
