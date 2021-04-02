<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${id}.svg`"
    :aspect-ratio="1/1"
    height="100%"
    width="100%"
    contain
  />
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        name: 'TeamLogo',
        props: {
            id: {
                type: Number,
                required: true,
            },
        },
    })
</script>