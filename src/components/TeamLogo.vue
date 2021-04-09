<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${id}.svg`"
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
            id: {
                type: [Number, String],
                required: true,
                validator: (value) => {
                  return parseInt(value) ? true : false
                }
            },
            height: {
              type: String,
              default: "50%",
            }
        },
    })
</script>
