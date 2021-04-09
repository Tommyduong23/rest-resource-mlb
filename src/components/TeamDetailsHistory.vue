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
      <ul v-if="!meta.loading">
        <li
          v-for="team in teamHistory"
          :key="team.teamCode + team.season"
        >
          <strong>{{ team.name }}</strong> | First Season: {{ team.season }}
        </li>
      </ul>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import Vue from 'vue'

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
        },
    })
</script>
