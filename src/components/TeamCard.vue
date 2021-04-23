<template>
  <v-card
    max-width="100%"
    height="210px"
  >
    <mlb-team-logo
      :team="team"
      :style="{ 'height' : '50%' }"
    />

    <v-card-title>
      {{ team.get('teamName') }}
    </v-card-title>

    <v-card-subtitle>
      {{ team.get('locationName') }}
    </v-card-subtitle>

    <v-card-text v-if="team.attributes.division">
      {{ team.get('division.abbreviation') }}
    </v-card-text>
  </v-card>
</template>

<script>
  import Vue from 'vue'

  import TeamResource from '../resources/team'

  export default Vue.extend({
    name: "TeamCard",

    props: {
        team: {
            type: Object,
            required: true,
            validator: value => value instanceof TeamResource
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
