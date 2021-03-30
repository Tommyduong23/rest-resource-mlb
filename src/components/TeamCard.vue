<template>
  <v-card
    v-if="team"
    height="200"
  >
    <mlb-team-logo
      v-if="id"
      :id="id"
      dimension="75px"
    />
    <v-card-title>
      {{ team.attributes.teamName }}
    </v-card-title>

    <v-card-subtitle>
      {{ team.attributes.locationName }}
    </v-card-subtitle>
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
        dimension: {
            type: String,
            default: '100px',
            validator: function (value) {
              return value.endsWith('px') || value.endsWith('%')
           }
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