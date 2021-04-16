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
      <ag-grid-vue
        dom-layout="autoHeight"
        class="ag-theme-alpine"
        :column-defs="columnDefs"
        :row-data="rowData"
      />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
    import Vue from 'vue'
    import { AgGridVue } from "ag-grid-vue";

    import { getTeamColors } from '../config'

    export default Vue.extend({
        components: {
            AgGridVue
        },

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
                teamCoaches: [],
            }
        ),

        computed: {
          rowData () {
            return this.teamCoaches.map(coach => {
              return {
                number: coach.jerseyNumber ? coach.jerseyNumber : "--",
                name: coach.person.fullName,
                job: coach.job,
              }
            })
          },

          columnDefs () {
            return [
              {
                field: 'number',
                headerName: '#',
                width: 45,
                sortable: true,
                suppressSizeToFit: true,
                cellStyle: {
                  'padding': '0 10px',
                  'color': getTeamColors(this.teamDetails.attributes.id)[1],
                  'background-color': getTeamColors(this.teamDetails.attributes.id)[0],
                  'font-weight': 'bold',
                  'font-size': '1em',
                  'text-align': 'center',
                }
              },
              {field: 'name', headerName: 'Coach Name', sortable: true},
              {field: 'job', sortable: true},
            ]
          },
        },

        watch: {
            selectedSeason () {
                this.getTeamCoaches()
            },
        },

        mounted() {
            this.getTeamCoaches()
        },

        methods: {
            getTeamColors,
            async getTeamCoaches () {
                let coachesRequest = this.teamDetails.wrap('/coaches', { sportIds: '1', season: this.selectedSeason })
                let coachesResponse = await coachesRequest.get()
                this.teamCoaches = coachesResponse.data.roster
            },
        },
    })
</script>
