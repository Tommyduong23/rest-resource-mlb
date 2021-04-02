<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer" />

      <v-toolbar-title>Major League Baseball</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="meta.drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-expansion-panels accordion>
        <template v-for="division in teamResourceListByDivision">
          <v-expansion-panel
            :key="division.id"
            :class="'division-'+division.id+'-header'"
          >
            <v-expansion-panel-header
              :key="division.id+'-header'"
            >
              <mlb-division-name
                :id="division.id"
                is-header
              />
            </v-expansion-panel-header>
            <v-expansion-panel-content
              :key="division.id+'-content'"
            >
              <v-row
                :key="division.id+'-items'"
                :class="'division-'+division.id+'-items'"
              >
                <v-col
                  v-for="team in division.teams"
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
        },
        teamResourceList: [],
      }
    ),

    computed: {
      divisionsFromResourceList: function () {
        return [...new Set(this.teamResourceList.map(team => team.attributes.division.id))].sort()
      },

      teamResourceListByDivision: function () {
        let result = []

        this.divisionsFromResourceList.forEach(division => {
          result.push({
            id: division,
            teams: this.teamResourceList.filter(team => team.attributes.division.id == division)
          })
        })
        return result
      },
    },

    async mounted() {
      let results = await TeamResource.list({ query: { sportIds: '1' } })
      this.teamResourceList = results.resources
    },

    methods: {
      toggleDrawer: function () {
        this.meta.drawer = !this.meta.drawer
      },
    },
  })
</script>
