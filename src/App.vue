<template>
  <v-app>
    <v-main class="app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
.app {
  background: rgb(255,255,255);
}
</style>
