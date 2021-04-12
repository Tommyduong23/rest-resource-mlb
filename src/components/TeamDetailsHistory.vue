<template>
  <v-expansion-panel
    key="team-history"
  >
    <v-expansion-panel-header
      key="team-history-header"
    >
      Team History
    </v-expansion-panel-header>
    <v-expansion-panel-content
      key="team-history-content"
    >
      <v-timeline
        v-if="!meta.loading"
        dense
      >
        <v-timeline-item
          v-for="(team, i) in teamHistory"
          :key="i"
          large
          fill-dot
          :color="getTeamColors(teamDetails.attributes.id)[0]"
          :style="{ 'color': getTeamColors(teamDetails.attributes.id)[1] }"
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
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
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
          selectedSeason: {
              type: Number,
              required: true,
          }
      },

      data: () => (
          {
              meta: {
                  loading: true,
              },
              teamHistory: [],
          }
      ),

      watch: {
          selectedSeason () {
              this.getTeamHistory()
          },
      },

      async mounted() {
          this.getTeamHistory()
      },

      methods: {
          async getTeamHistory () {
              this.meta.loading = true

              let historyRequest = this.teamDetails.wrap('/history')
              let historyResponse = await historyRequest.get()
              this.teamHistory = historyResponse.data.teams

              this.meta.loading = false
          },
          getTeamColors,
      },
  })
</script>
