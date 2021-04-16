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
        <v-icon :color="getTeamColors(team)[1]">
          mdi-calendar
        </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-autocomplete
          v-model="selectedSeason"
          :items="seasonList"
          item-text="attributes.seasonId"
          item-value="attributes.seasonId"
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

  import { SeasonList } from '../mixins'
  import { getTeamColors } from '../config'

  export default Vue.extend({
    mixins: [SeasonList],

    props: {
        team: {
            type: Number,
            default: 0,
        },
    },

    computed: {
      selectedSeason: {
        get () {
          return this.$store.state.selectedSeason
        },
        set (value) {
          this.$store.commit('setSeason', value)
        }
      },
    },

    async mounted() {
      await this.getSeasonList({ query: { sportId: '1', all: 'true'} })

      if (!this.$store.state.selectedSeason) {
        this.$store.commit('setSeason', this.seasonList[0].attributes.seasonId)
      }
    },

    methods: {
      getTeamColors,
    },
  })
</script>
