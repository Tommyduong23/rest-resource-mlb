<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="meta.drawer = !meta.drawer" />

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
      <v-container>
        <v-row>
          <v-col
            class="mt-2"
            cols="12"
          >
            <strong>Teams</strong>
          </v-col>

          <template v-if="teamResourceList.length>0">
            <v-col
              v-for="(teamResource, idx) in teamResourceList"
              :key="idx"
              cols="4"
              md="3"
            >
              <mlb-team-card
                :id="teamResource.attributes.id"
                dimension="75px"
              />
            </v-col>
          </template>
        </v-row>
        <v-row>
          <template v-for="n in 4">
            <v-col
              :key="n"
              class="mt-2"
              cols="12"
            >
              <strong>Category {{ n }}!</strong>
            </v-col>

            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150" />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'

  import TeamResource from './resources/team'
  import LeagueResource from './resources/team'

  export default Vue.extend({
    data: () => (
      { 
        meta: {
          drawer: null,
        },
        teamResourceList: [],
      }
    ),

    async mounted() {
      let results = await TeamResource.list({ query: { sportIds: '1' } })
      console.log(results)
      this.teamResourceList = results.resources

      // let LeagueResults = await LeagueResource.list()
      // console.log(LeagueResults.resources)
    },
  })
</script>
