<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-app-bar-title class="app-title">
        Major League Baseball
      </v-app-bar-title>
      <v-spacer />
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
    </v-app-bar>

    <v-navigation-drawer
      v-model="meta.drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-expansion-panels 
        v-if="!meta.loading"
        v-model="meta.expandedPanel"
        accordion
      >
        <template v-for="league in teamResourceListByLeague">
          <v-expansion-panel
            :key="league.id"
            :class="'league-'+league.id+'-header'"
          >
            <v-expansion-panel-header
              :key="league.id+'-header'"
            >
              <mlb-league-name
                :id="league.id"
                is-header
              />
            </v-expansion-panel-header>
            <v-expansion-panel-content
              :key="league.id+'-content'"
            >
              <v-row
                :key="league.id+'-items'"
                :class="'league-'+league.id+'-items'"
              >
                <v-col
                  v-for="team in league.teams"
                  :key="team.attributes.id"
                  cols="12"
                  xs="5"
                  sm="4"
                  md="3"
                  lg="2"
                  xl="1"
                >
                  <mlb-team-card
                    :id="team.attributes.id"
                    :season="selectedSeason"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </template>
      </v-expansion-panels>
      <div v-else>
        Loading...
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'

  import TeamResource from './resources/team'
  import SeasonResource from './resources/season'

  export default Vue.extend({
    data: () => (
      {
        meta: {
          drawer: null,
          showSeasonSelect: null,
          expandedPanel: 0,
          loading: false,
        },
        teamResourceList: [],
        selectedSeason: null,
        leagueSeasons: [],
      }
    ),

    computed: {
      leaguesFromResourceList () {
        return [...new Set(this.teamResourceList.map(team => team.attributes.league))].sort()
      },

      teamResourceListByLeague () {
        let result = []

        this.leaguesFromResourceList.forEach(league => {
          result.push({
            id: league,
            teams: this.teamResourceList.filter(team => team.attributes.league == league),
          })
        })

        return result
      },
    },

    watch: {
      selectedSeason () {
        this.getResourceList()
      },
    },

    async mounted() {
      let seasons = await SeasonResource.list({ query: { sportId: '1', all: 'true'} })
      this.leagueSeasons = seasons.resources.map(season => parseInt(season.attributes.seasonId)).sort((a, b) => {return b - a})
      this.selectedSeason = this.leagueSeasons[0]
      this.getResourceList()
    },

    methods: {
      async getResourceList () {
        this.meta.loading = true
        let results = await TeamResource.list({ query: { sportIds: '1', season: this.selectedSeason} })
        this.teamResourceList = results.resources
        this.meta.loading = false
      },
      toggleDrawer () {
        this.meta.drawer = !this.meta.drawer
      },
      toggleSeasonSelect () {
        this.meta.showSeasonSelect = !this.meta.showSeasonSelect
      },
    },
  })
</script>
