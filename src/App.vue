<template>
  <v-app id="inspire">
    <v-app-bar
      app
      prominent
    >
      <v-app-bar-nav-icon @click="toggleDrawer" />

      <v-select
        v-model="selectedSeason"
        :items="leagueSeasons"
        label="Season"
        class="season-select"
      />

      <v-app-bar-title
        class="app-title"
      >
        Major League Baseball
      </v-app-bar-title>
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
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'

  import TeamResource from './resources/team'

  export default Vue.extend({
    data: () => (
      {
        meta: {
          drawer: null,
          expandedPanel: 0,
        },
        teamResourceList: [],
        selectedSeason: null,
        leagueSeasons: [2021, 2020, 2019, 2018, 2017, 2016, 1960, 1910, 1876],
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
      this.selectedSeason = new Date().getFullYear()
      this.getResourceList()
    },

    methods: {
      async getResourceList () {
        let results = await TeamResource.list({ query: { sportIds: '1', season: this.selectedSeason} })
        this.teamResourceList = results.resources
      },
      toggleDrawer () {
        this.meta.drawer = !this.meta.drawer
      },
    },
  })
</script>

<style scoped>
  .app-title {
    float: left;
    clear: both;
  }
  .season-select {
    position: absolute;
    display: block;
    top: 15px;
    right: 15px;
  }
</style>
