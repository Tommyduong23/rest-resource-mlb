<template>
  <v-img
    :src="`//www.mlbstatic.com/team-logos/${id}.svg`"
    :height="dimension"
    :width="dimension"
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
        dimension: {
            type: String,
            default: '100px',
            validator: function (value) {
              return value.endsWith('px') || value.endsWith('%')
           }
        }
    },
  })
</script>