<template>
  <div
    :class="isHeader ? 'division-header' : 'division-tag'"
  >
    {{ isHeader ? division.attributes.name : division.attributes.abbreviation }}
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'DivisionName',

    props: {
        division: {
            type: Object,
            required: true,
        },
        isHeader: Boolean,
    },
  })
</script>

<style scoped>
  .division-header {
    padding: 10px;
    font-weight: bold;
  }
</style>