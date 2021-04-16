<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${team.attributes.id}.svg`"
    :aspect-ratio="1/1"
    :height="height"
    width="auto"
    contain
  />
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        name: 'TeamLogo',
        props: {
            team: {
                type: Object,
                required: true,
            },
            height: {
                type: String,
                default: "50%",
            }
        },
    })
</script>
