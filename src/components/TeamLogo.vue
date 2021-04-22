<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${team.attributes.id}.svg`"
    contain
  />
</template>

<script>
    import Vue from 'vue'

    import TeamResource from '../resources/team'

    export default Vue.extend({
        name: 'TeamLogo',
        props: {
            team: {
                type: Object,
                required: true,
                validator: value => value instanceof TeamResource
            },
        },
    })
</script>
