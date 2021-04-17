<template>
  <mlb-base>
    <template #page-title>
      MLB Dashboard
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <v-expansion-panels 
      v-if="teamList"
      :value="0"
      accordion
    >
      <template v-for="league in teamListByLeague">
        <v-expansion-panel
          :key="league.id"
          :class="'league-'+league.id+'-header'"
        >
          <v-expansion-panel-header
            :key="league.id+'-header'"
          >
            <strong> {{ league.name }} </strong>
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
                cols="6"
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
                    :team="team"
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

  import { LeagueList, TeamList } from '../mixins'

  export default Vue.extend({
   mixins: [LeagueList, TeamList],

    computed: {
      ...mapState([
        'selectedSeason'
      ]),

      teamListByLeague () {
        let result = []

        this.leagueList.forEach(league => {
          result.push({
            id: league.id,
            name: league.attributes.name,
            teams: this.teamList.filter(team => team.attributes.league == league.id),
          })
        })

        return result
      },
    },

    watch: {
      selectedSeason () {
        this.getLeagueList({query: { season: this.selectedSeason, sportId: '1', leagueIds: '103,104'} })
        this.getTeamList({query: { season: this.selectedSeason, sportIds: '1' }, resolveRelated: true })
      },
    },

    async mounted() {
      if (this.selectedSeason) {
        this.getLeagueList({query: { season: this.selectedSeason, sportId: '1', leagueIds: '103,104'} })
        this.getTeamList({query: { season: this.selectedSeason, sportIds: '1' }, resolveRelated: true })
      }
    },
  })
</script>

<style scoped>
  .team-card-link {
    cursor: pointer;
  }
</style>
