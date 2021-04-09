<template>
  <mlb-base>
    <template #page-title>
      {{ !meta.loading ? teamDetails.attributes.name : "Loading..." }}
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <template v-if="!meta.loading">
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

  import TeamResource from '../resources/team'

  import TeamDetailsRoster from '../components/TeamDetailsRoster'
  import TeamDetailsCoaches from '../components/TeamDetailsCoaches'
  import TeamDetailsHistory from '../components/TeamDetailsHistory'

  export default Vue.extend({
    components: {
        TeamDetailsRoster,
        TeamDetailsCoaches,
        TeamDetailsHistory,
    },

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    data: () => (
      {
        meta: {
          expandedPanel: 0,
          loading: true,
          teamComponents: [
            "roster",
            "coaches",
            "history",
          ]
        },
        teamDetails: {},
        leagueSeasons: [],
      }
    ),

    computed: mapState([
      'selectedSeason'
    ]),

    watch: {
      selectedSeason () {
        this.getTeamDetails()
      },
    },

    async mounted() {
      if (this.selectedSeason) {
        this.getTeamDetails()
      }
    },

    methods: {
      async getTeamDetails () {
        this.meta.loading = true
        this.teamDetails = await TeamResource.detail(this.id, { query: { sportIds: '1', season: this.selectedSeason} })
        this.meta.loading = false
      },
    },
  })
</script>
