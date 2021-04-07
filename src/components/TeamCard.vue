<template>
  <v-card
    v-if="team"
    max-width="100%"
    height="210px"
  >
    <mlb-team-logo
      v-if="id"
      :id="id"
    />

    <v-card-title>
      {{ team.attributes.teamName }}
    </v-card-title>

    <v-card-subtitle>
      {{ team.attributes.locationName }}
    </v-card-subtitle>

    <v-card-text
      v-if="team.attributes.division"
    >
      <mlb-division-name
        :id="team.attributes.division.id"
        :style="{color: '#aaa'}"
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import Vue from 'vue'

  import TeamResource from '../resources/team'

  export default Vue.extend({
    name: "TeamCard",

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

    data: () => ({
      team: null
    }),

    watch: {
      season () {
        this.getTeam()
      },
    },

    mounted () {
      this.getTeam()
    },

    methods: {
      async getTeam () {
        TeamResource.clearCache()
        this.team = await TeamResource.detail(this.id, { query: {season: this.season} })
      },
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