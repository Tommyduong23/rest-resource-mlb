<template>
  <mlb-base
    :team="teamDetails ? teamDetails.attributes.id : 0"
  >
    <template #page-title>
      {{ teamDetails ? teamDetails.attributes.name : "Loading..." }}
    </template>
    <template #top-right-menu>
      <mlb-season-select :team="teamDetails ? teamDetails.attributes.id : 0" />
    </template>

    <template v-if="teamDetails">
      <v-row>
        <v-col
          cols="6"
          sm="4"
          md="3"
          lg="2"
          xl="1"
        >
          <v-card
            class="pa-3 ma-5 rounded-lg"
            elevation="3"
          >
            <mlb-team-logo :team="teamDetails" />
          </v-card>
        </v-col>
        <v-col
          cols="6"
          sm="6"
          md="8"
          lg="9"
          xl="10"
        >
          <v-card
            tile
            class="my-5"
            color="transparent"
            elevation="0"
          >
            <dl>
              <dt>
                <h3>{{ teamDetails.attributes.division ? "Division:" : "League:" }}</h3>
              </dt>
              <dd>
                {{ teamDetails.attributes.division ? teamDetails.get('division.name') : teamDetails.get('league.name') }}
              </dd>

              <dt class="mt-5">
                <h3>Venue:</h3>
              </dt>
              <dd>
                {{ teamDetails.get('venue.name') }}
              </dd>
            </dl>
          </v-card>
        </v-col>
      </v-row>
      <v-expansion-panels 
        :value="0"
        accordion
      >
        <template v-for="(teamComponent, idx) in teamComponents">
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
        teamComponents: [
          "roster",
          "coaches",
          "history",
        ],
      }
    ),

    computed: {
      ...mapState(['selectedSeason']),
    },

    watch: {
      selectedSeason () {
        this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.selectedSeason}, resolveRelated: true, useCache: false } )
      },
    },

    mounted() {
      if (this.selectedSeason) {
        this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.selectedSeason}, resolveRelated: true, useCache: false } )
      }
    },
  })
</script>
