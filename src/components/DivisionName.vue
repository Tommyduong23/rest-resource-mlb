<template>
  <div
    v-if="division"
    :class="isHeader ? 'division-header' : 'division-tag'"
  >
    {{ isHeader ? division.attributes.name : division.attributes.abbreviation }}
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
  import Vue from 'vue'

  import DivisionResource from '../resources/division'

  export default Vue.extend({
    name: 'DivisionName',

    props: {
        id: {
            type: Number,
            required: true,
            validator: id => 200 <= id && id <= 205,
        },
        isHeader: Boolean,
    },

    data: () => ({
        division: null
    }),

    async mounted () {
        this.division = await DivisionResource.detail(this.id)
        console.log(this.division)
    }
  })
</script>

<style scoped>
  .division-header {
    padding: 10px;
    font-weight: bold;
  }
</style>