<template>
  <v-card
    v-if="teamDetails"
    max-width="100%"
    height="210px"
  >
    <mlb-team-logo
      v-if="id"
      :id="id"
    />

    <v-card-title>
      {{ teamDetails.attributes.teamName }}
    </v-card-title>

    <v-card-subtitle>
      {{ teamDetails.attributes.locationName }}
    </v-card-subtitle>

    <v-card-text
      v-if="teamDetails.attributes.division"
    >
      <mlb-division-name
        :id="teamDetails.attributes.division"
        :style="{color: '#aaa'}"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import Vue from 'vue'

  import { TeamDetails } from '../mixins'

  export default Vue.extend({
    name: "TeamCard",

    mixins: [TeamDetails],

    props: {
        id: {
            type: Number,
            required: true,
        },
        season: {
            type: Number,
            required: true,
        }
    },

    watch: {
      season () {
        this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.season}, useCache: false } )
      },
    },

    mounted () {
      this.getTeamDetails(this.id, { query: { sportIds: '1', season: this.season}, useCache: false } )
    },
  })
</script>

<style scoped>
  .v-card {
    padding-top: 25px;
  }
  .v-card__text {
    position: absolute;
    display: block;
    bottom: 6px;
    right: 10px;
    text-align: right;
  }
</style>
