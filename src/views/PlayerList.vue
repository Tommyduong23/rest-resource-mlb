<template>
  <mlb-base>
    <template #page-title>
      MLB Players
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <template v-if="mlbPlayers">
      <ag-grid-vue
        dom-layout="autoHeight"
        class="ag-theme-alpine"
        :column-defs="columnDefs"
        :row-data="rowData"
      />
    </template>

    <div v-else>
      Loading...
    </div>
  </mlb-base>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { AgGridVue } from "ag-grid-vue";

  import { SportDetails } from '../mixins'

  export default Vue.extend({
    components: {
      AgGridVue
    },

    mixins: [SportDetails],

    data: () => ({
        mlbPlayers: null,
    }),

    computed: {
      ...mapState(['selectedSeason']),

      rowData () {
        return this.mlbPlayers.map(player => {
          return {
            number: player.primaryNumber,
            firstName: player.firstName,
            lastName: player.lastName,
            age: player.currentAge,
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
              'font-weight': 'bold',
              'font-size': '1em',
              'text-align': 'center',
            }
          },
          {field: 'firstName', sortable: true},
          {field: 'lastName', sortable: true},
          {field: 'age', sortable: true},
         ]
      },
    },

    watch: {
        selectedSeason: {
            immediate: true,
            handler(newVal) {
                newVal && this.getPlayerList({ season: this.selectedSeason })
      },
    },
    },

    methods: {
      async getPlayerList(options = {}) {
        await this.getSportDetails('1')
        let playerRequest = this.sportDetails.wrap('/players', { ...options })
        let playerResponse = await playerRequest.get()
        this.mlbPlayers = playerResponse.data.people
      },
    },
  })
</script>
