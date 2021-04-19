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
        <v-icon :color="colors['secondary']">
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
  import { colors } from '../config/teamColors'

  export default Vue.extend({
    mixins: [SeasonList],

    props: {
        colors: {
            type: Object,
            default: () => {return colors.default}
        }
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

      this.selectedSeason = this.selectedSeason || this.seasonList[0].attributes.seasonId
    },
  })
</script>
