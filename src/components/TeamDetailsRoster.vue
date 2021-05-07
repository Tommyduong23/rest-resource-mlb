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
      <ag-grid-vue
        v-if="teamRoster"
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
                type: String,
                required: true,
            }
        },

        data: () => (
            {
                teamRoster: null,
            }
        ),

        computed: {
          rowData () {
            return this.teamRoster.map(player => {
              return {
                number: player.jerseyNumber ? player.jerseyNumber : player.position.abbreviation,
                name: player.person.fullName,
                position: player.position.name,
                status: player.status.description,
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
                  'color': getTeamColors(this.teamDetails.attributes.id)['secondary'],
                  'background-color': getTeamColors(this.teamDetails.attributes.id)['primary'],
                  'font-weight': 'bold',
                  'font-size': '1em',
                  'text-align': 'center',
                }
              },
              {field: 'name', headerName: 'Player Name', sortable: true},
              {field: 'position', sortable: true},
              {field: 'status', sortable: true},
            ]
          },
        },

        watch: {
          selectedSeason: {
              immediate: true,
              handler(newVal) {
                  newVal && this.getTeamRoster()
              },
          },
        },

        methods: {
            getTeamColors,
            async getTeamRoster () {
                let rosterRequest = this.teamDetails.wrap('/roster', { sportIds: '1', season: this.selectedSeason })
                let rosterResponse = await rosterRequest.get()
                this.teamRoster = rosterResponse.data.roster
            },
        },
    })
</script>
