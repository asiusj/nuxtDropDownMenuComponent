<template>
  <div>
    <h3>Test Nuxt</h3>
    <dropDown parent siblings />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dropDown from "@/components/dropDown.vue";

@Component({
  components: {
    dropDown
  }
})
export default class App extends Vue {}
</script>

<style>
</style>