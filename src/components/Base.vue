<template>
  <div>
    <v-app-bar
      app
      :style="{ 'background-color': colors['primary'] }"
    >
      <v-app-bar-nav-icon
        :color="colors['secondary']"
        @click="toggleDrawer"
      />
      <div class="app-title">
        <h1 :style="{ 'color': colors['secondary'] }">
          <slot name="page-title">
            Major League Baseball
          </slot>
        </h1>
      </div>
      <v-spacer />
      <slot name="top-right-menu" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <slot>
        Need to Implement
      </slot>
    </v-main>
  </div>
</template>

<script>
    import Vue from 'vue'

    import { colors } from '../config/teamColors'

    export default Vue.extend({
        props: {
            colors: {
                type: Object,
                default: () => {return colors.default}
            }
        },

        data: () => (
            {
                drawer: null,
                items: [
                  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/' },
                  //{ title: 'About', icon: 'mdi-information', path: '/about' },
                  { title: 'Teams', icon: 'mdi-account-group', path: '/teams' },
                  { title: 'Players', icon: 'mdi-card-account-details', path: '/players' },
                  //{ title: 'Venues', icon: 'mdi-stadium', path: '/venues' },
                ],
            }
        ),

        methods: {
            toggleDrawer () {
                this.drawer = !this.drawer
            },
        },
    })
</script>
