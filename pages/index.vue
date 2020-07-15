<template>
  <b-container>
    <b-row>
      <b-col class="text-center p-4">
        <h4>{{title}}</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="parent-block d-flex mt-2 mb-2 p-0 align-items-start">
        <dropDown parent siblings>
          <template #mainButton>
            <div class="any-other-component-styles">Some best button</div>
          </template>
          <div>Any Content with own styles, components, etc.</div>
          <ul>
            <li>menu item 1</li>
            <li>menu item 2</li>
            <li>menu item 3</li>
            <li>menu item 4</li>
            <li>menu item 5</li>
          </ul>
        </dropDown>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="parent-block d-flex mt-2 mb-2 p-0 align-items-start justify-content-end">
        <b-button-toolbar>
          <b-button>Some button</b-button>
          <b-button>button 2</b-button>
          <b-button>button 3</b-button>
          <dropDown parent siblings mainButtonText="Menu" icon>
            <div>Any Content with own styles, components, etc.</div>
            <ul>
              <li>menu item 1</li>
              <li>menu item 2</li>
              <li>menu item 3</li>
              <li>menu item 4</li>
              <li>menu item 5</li>
            </ul>
          </dropDown>
          <b-button>button N</b-button>
        </b-button-toolbar>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="parent-block d-flex mt-2 mb-2 p-0 align-items-end justify-content-end">
        <dropDown parent siblings icon="mdi-menu-open" :content="menu" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dropDown from "@/components/dropDown.vue";
import DropDownMenu from "@/models/DropDownMenu";

@Component({
  components: {
    dropDown
  }
})
export default class App extends Vue {
  title = "DropDown component";

  menu: DropDownMenu = {
    data: [
      { name: "Home", path: "/", tag: "a" },
      { name: "News", path: "/news", tag: "a" },
      { name: "About", path: "/", tag: "button" },
      { name: "ClickEventButton" }
    ]
  };
}
</script>

<style>
.any-other-component-styles {
  font-weight: 600;
  color: green;
  cursor: pointer;
}
.parent-block {
  background-color: #e6e6e6;
  min-height: 360px;
}
</style>