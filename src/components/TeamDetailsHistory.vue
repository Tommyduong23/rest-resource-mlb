<template>
  <v-expansion-panel
    key="team-history"
  >
    <v-expansion-panel-header
      key="team-history-header"
    >
      <h2>Team History</h2>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      key="team-history-content"
    >
      <v-timeline
        v-if="teamHistory"
        dense
      >
        <v-timeline-item
          v-for="(team, i) in teamHistory"
          :key="i"
          large
          fill-dot
          :color="getTeamColors(teamDetails.attributes.id)['primary']"
          :style="{ 'color': getTeamColors(teamDetails.attributes.id)['secondary'] }"
        >
          <template v-slot:icon>
            <strong class="team-season-date">
              {{ team.season }}
            </strong>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">
              {{ team.name }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <dl>
                    <dt>
                      <h4>League:</h4>
                    </dt>
                    <dd>
                      {{ team.league.name }}
                    </dd>
                  </dl>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <dl>
                    <dt>
                      <h4>Venue:</h4>
                    </dt>
                    <dd>
                      {{ team.venue.name }}
                    </dd>
                  </dl>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <template v-slot:opposite>
            <span
              v-text="team.season"
            />
          </template>
        </v-timeline-item>
      </v-timeline>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import Vue from 'vue'

  import { getTeamColors } from '../config'

  export default Vue.extend({
      props: {
          teamDetails: {
              type: Object,
              required: true,
          },
      },

      data: () => (
          {
              teamHistory: null,
          }
      ),

      async mounted() {
          this.getTeamHistory()
      },

      methods: {
          getTeamColors,
          async getTeamHistory () {
              let historyRequest = this.teamDetails.wrap('/history')
              let historyResponse = await historyRequest.get()
              this.teamHistory = historyResponse.data.teams
          },
      },
  })
</script>
