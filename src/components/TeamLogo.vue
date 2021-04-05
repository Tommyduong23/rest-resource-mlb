<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${id}.svg`"
    :aspect-ratio="1/1"
    height="50%"
    width="auto"
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