<template>
  <v-card
    v-if="team"
    max-width="100%"
    height="210px"
    :class="'division-'+team.attributes.division.id"
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

    <v-card-text>
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
        }
    },

    data: () => ({
      team: null
    }),

    async mounted () {
      this.team = await TeamResource.detail(this.id)
    }
  })
</script>

<style scoped>
    .division-200, .division-201, .division-202,
    .division-203, .division-204, .division-205 {
      border: 2px solid black!important;
    }
</style>