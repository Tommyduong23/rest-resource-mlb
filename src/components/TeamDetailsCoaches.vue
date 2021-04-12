<template>
  <v-expansion-panel
    key="team-coaches"
  >
    <v-expansion-panel-header
      key="team-coaches-header"
    >
      <h2>Team Coaches</h2>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      key="team-coaches-content"
    >
      <ul v-if="!meta.loading">
        <li
          v-for="coach in teamCoaches"
          :key="coach.person.id"
        >
          <strong>{{ coach.person.fullName }}</strong> | {{ coach.job }}
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
                teamCoaches: [],
            }
        ),

        watch: {
            selectedSeason () {
                this.getTeamCoaches()
            },
        },

        async mounted() {
            this.getTeamCoaches()
        },

        methods: {
            async getTeamCoaches () {
                this.meta.loading = true
                
                let coachesRequest = this.teamDetails.wrap('/coaches', { sportIds: '1', season: this.selectedSeason })
                let coachesResponse = await coachesRequest.get()
                this.teamCoaches = coachesResponse.data.roster
                
                this.meta.loading = false
            },
        },
    })
</script>
