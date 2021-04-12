<template>
  <v-expansion-panel
    key="team-roster"
  >
    <v-expansion-panel-header
      key="team-roster-header"
    >
      <h2>Team Roster</h2>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      key="team-roster-content"
    >
      <ul v-if="!meta.loading">
        <li
          v-for="player in teamRoster"
          :key="player.person.id"
        >
          <strong>{{ player.person.fullName }} ({{ player.jerseyNumber }})</strong> | {{ player.position.abbreviation }}
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
                teamRoster: [],
            }
        ),

        watch: {
            selectedSeason () {
                this.getTeamRoster()
            },
        },

        async mounted() {
            this.getTeamRoster()
        },

        methods: {
            async getTeamRoster () {
                this.meta.loading = true
                
                let rosterRequest = this.teamDetails.wrap('/roster', { sportIds: '1', season: this.selectedSeason })
                let rosterResponse = await rosterRequest.get()
                this.teamRoster = rosterResponse.data.roster
                
                this.meta.loading = false
            },
        },
    })
</script>
