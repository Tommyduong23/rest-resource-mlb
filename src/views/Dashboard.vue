<template>
  <mlb-base>
    <template #page-title>
      MLB Dashboard
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

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
                <router-link
                  tag="div"
                  :to="`/teams/${team.attributes.id}`"
                  class="team-card-link"
                >
                  <mlb-team-card
                    :id="team.attributes.id"
                    :season="selectedSeason"
                  />
                </router-link>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
    <div v-else>
      Loading...
    </div>
  </mlb-base>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'

  import TeamResource from '../resources/team'

  export default Vue.extend({
    data: () => (
      {
        meta: {
          expandedPanel: 0,
          loading: false,
        },
        teamResourceList: [],
      }
    ),

    computed: {
      ...mapState([
        'selectedSeason'
      ]),

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
      if (this.selectedSeason) {
        this.getResourceList()
      }
    },

    methods: {
      async getResourceList () {
        this.meta.loading = true
        let results = await TeamResource.list({ query: { sportIds: '1', season: this.selectedSeason} })
        this.teamResourceList = results.resources
        this.meta.loading = false
      },
    },
  })
</script>

<style scoped>
  .team-card-link {
    cursor: pointer;
  }
</style>
