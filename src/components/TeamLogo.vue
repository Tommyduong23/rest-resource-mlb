<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${team.attributes.id}.svg`"
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
                validator: (value) => {
                    if ('attributes' in value && 'id' in value.attributes) {
                        return true
                    } else {
                        return false
                    }
                }
            },
        },
    })
</script>
