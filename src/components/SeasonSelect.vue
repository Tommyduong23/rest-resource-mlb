<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    right
    bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="black">
          mdi-calendar
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-autocomplete
          v-model="selectedSeason"
          :items="leagueSeasons"
          hide-details="auto"
          label="Season"
          class="season-select"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import Vue from 'vue'

  import SeasonResource from '../resources/season'

  export default Vue.extend({
    data: () => (
      {
        meta: {
          showSeasonSelect: null,
          loading: false,
        },
        leagueSeasons: [],
      }
    ),

    computed: {
      selectedSeason: {
        get () {
          return this.$store.state.selectedSeason
        },
        set (value) {
          this.$store.commit('setSeason', value)
        }
      }
    },

    async mounted() {
      let seasons = await SeasonResource.list({ query: { sportId: '1', all: 'true'} })
      this.leagueSeasons = seasons.resources.map(season => parseInt(season.attributes.seasonId)).sort((a, b) => {return b - a})
      if (!this.$store.state.selectedSeason) {
        this.$store.commit('setSeason', this.leagueSeasons[0])
      }
    },

    methods: {
      toggleSeasonSelect () {
        this.meta.showSeasonSelect = !this.meta.showSeasonSelect
      },
    },
  })
</script>
