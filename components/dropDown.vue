<template>
  <div class="dropDown">
    <slot name="mainButton">
      <div class="dropDown__mainButton">{{ mainButtonText }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DropDown extends Vue {
  @Prop() parent?: boolean = false;
  @Prop() siblings?: boolean = false;
  @Prop() mainButtonText: string = "Options";

  created() {
    if (this?.parent !== undefined) {
      console.log("is Parent");
    }
  }
}
</script>

<style lang="scss" scoped>
.dropDown {
  .dropDown__mainButton {
    color: red;
  }
}
</style>
