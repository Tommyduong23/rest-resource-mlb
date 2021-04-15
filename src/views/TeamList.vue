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
        style="width: 500px; height: 500px;"
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
            venue: team.get('venue.name')
          }
        })
      },

      columnDefs () {
        return [
          {field: 'name'},
          {field: 'venue'}
         ]
      },
    },

    watch: {
      selectedSeason () {
        this.getTeamList({query: { season: this.selectedSeason, sportIds: '1' }, resolveRelated: true })
      },
    },

    async mounted() {
      if (this.selectedSeason) {
        this.getTeamList({query: { season: this.selectedSeason, sportIds: '1' }, resolveRelated: true })
      }
    },
  })
</script>
