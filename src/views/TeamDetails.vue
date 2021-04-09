<template>
  <mlb-base>
    <template #page-title>
      {{ !meta.loading ? teamDetails.attributes.name : "Loading..." }}
    </template>
    <template 
      #top-right-menu
    >
      <v-menu
        offset-y
        :close-on-content-click="false"
        right
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="black">
              mdi-calendar
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-autocomplete
              v-model="selectedSeason"
              :items="leagueSeasons"
              hide-details="auto"
              label="Season"
              class="season-select"
            >
              Loading...
            </v-autocomplete>
          </v-list-item>
        </v-list>
      </v-menu>
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

  import TeamResource from '../resources/team'
  import SeasonResource from '../resources/season'

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
          showSeasonSelect: null,
          expandedPanel: 0,
          loading: true,
          teamComponents: [
            "roster",
            "coaches",
            "history",
          ]
        },
        teamDetails: {},
        selectedSeason: null,
        leagueSeasons: [],
      }
    ),

    watch: {
      selectedSeason () {
        this.getTeamDetails()
      },
    },

    async mounted() {
      let seasons = await SeasonResource.list({ query: { sportId: '1', all: 'true'} })
      this.leagueSeasons = seasons.resources.map(season => parseInt(season.attributes.seasonId)).sort((a, b) => {return b - a})
      this.selectedSeason = this.leagueSeasons[0]
      this.getTeamDetails()
    },

    methods: {
      async getTeamDetails () {
        this.meta.loading = true
        this.teamDetails = await TeamResource.detail(this.id, { query: { sportIds: '1', season: this.selectedSeason} })
        this.meta.loading = false
      },
      toggleSeasonSelect () {
        this.meta.showSeasonSelect = !this.meta.showSeasonSelect
      },
    },
  })
</script>
