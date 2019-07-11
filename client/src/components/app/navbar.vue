<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-if="!menuItem.children"
          v-for="menuItem in menuItems"
          :key="menuItem.path"
          :to="{ name: menuItem.name, query: menuItem.meta.defaults ? menuItem.meta.defaults.query : '' }">
          <i v-if="menuItem.meta.iconClass" :class="menuItem.meta.iconClass"/>
          {{ menuItem.meta.title }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'menuItems'
    ])
  },
};
</script>