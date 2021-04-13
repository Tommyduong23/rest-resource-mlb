<template>
  <mlb-base>
    <template #page-title>
      MLB Teams
    </template>
    <template #top-right-menu>
      <mlb-season-select />
    </template>

    <ul v-if="teamList">
      <li
        v-for="team in teamList"
        :key="team.attributes.id"
      >
        <strong>{{ team.attributes.name }}</strong>
      </li>
    </ul>
  </mlb-base>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'

  import { TeamList } from '../mixins'

  export default Vue.extend({
    mixins: [TeamList],

    computed: {
      ...mapState(['selectedSeason']),
    },

    watch: {
      selectedSeason () {
        this.getTeamList('1', this.selectedSeason)
      },
    },

    async mounted() {
      if (this.selectedSeason) {
        this.getTeamList('1', this.selectedSeason)
      }
    },
  })
</script>
