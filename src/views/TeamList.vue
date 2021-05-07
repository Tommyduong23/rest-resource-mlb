<template>
  <mlb-base>
    <template #page-title>
      MLB Teams
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <template v-if="teamList">
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

  import { TeamList } from '../mixins'

  export default Vue.extend({
    components: {
      AgGridVue
    },

    mixins: [TeamList],

    computed: {
      ...mapState(['selectedSeason']),

      rowData () {
        return this.teamList.map(team => {
          return {
            name: team.get('name'),
            league: team.get('league.name'),
            division: team.get('division.name'),
            venue: team.get('venue.name')
          }
        })
      },

      columnDefs () {
        // TODO: AG Grid is doing a weird thing of removing and adding division/league column, fix.
        let hasDivision = !!this.rowData[0].division

        return [
          {field: 'name', sortable: true},
          {field: hasDivision ? 'division' : 'league', sortable: true},
          {field: 'venue'}
         ]
      },
    },

    watch: {
        selectedSeason: {
            immediate: true,
            handler(newVal) {
                newVal && this.getTeamList({ query: { season: this.selectedSeason, sportIds: '1' }, resolveRelated: true })
      },
    },
    },
  })
</script>
