<template>
  <div ref="dropDown" class="dropDown" v-oclick="{ fn: Close }">
    <div class="dropDown__mainButton" @click="Switch">
      <slot name="mainButton">
        <div class="dropDown__mainButton_default">
          {{ mainButtonText }}
          <i
            v-if="icon !== undefined"
            class="mdi align-middle"
            :class="icon ? icon : ' mdi-dots-vertical'"
          ></i>
        </div>
      </slot>
    </div>
    <div
      class="dropDown__content"
      :class="
      [
      closed ? 'dropDown__content_closed' : '',
      hide ? ' hide' : '',
      show ? ' show' : '',
      axisSettings.x ? axisSettings.x : '',
      axisSettings.x ? axisSettings.y : ''

      ]"
    >
      <slot>
        <div v-if="content" class="dropDown__default-content-wrap">
          <dItem v-for="item in content.data" :key="item.name" :item="item" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DropDownMenu, { DropDownMenuItem } from "@/models/DropDownMenu";
import dropDownItem from "@/components/dropDownItem.vue";

interface distances extends Object {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

@Component
class dItem extends Vue {
  @Prop() item!: DropDownMenuItem;
  render(h: any) {
    return h(
      this.item.tag ? this.item.tag : "div",
      {
        class: "dropDown__contentItem",
        attrs: { href: this.item.path ? this.item.path : null }
      },
      [this.item.name]
    );
  }
}

@Component({
  components: { dItem }
})
export default class DropDown extends Vue {
  name = "dropDown";
  @Prop({ default: false }) parent?: boolean;
  @Prop({ default: false }) siblings?: boolean;
  @Prop({ default: undefined }) icon?: string;
  @Prop({ default: "Options" })
  mainButtonText?: string;
  @Prop({ default: "right" })
  align?: "string";
  @Prop() content?: DropDownMenu;
  @Prop({ default: "bottom" }) direction!: string;

  hide: boolean = false;
  show: boolean = false;
  closed: boolean = true;
  direct: string = "";
  axisSettings = {
    x: null as string | null | undefined,
    y: null as string | null | undefined
  };

  created() {
    this.direct = this.direction;
  }

  mounted() {
    this.SetOpenDirection(this.$refs.dropDown as HTMLElement);
  }

  Switch() {
    if (this.closed) {
      this.Open();
    } else {
      this.Close();
    }
  }

  Close() {
    if (this.closed) return;
    this.hide = true;
    setTimeout(() => {
      this.hide = false;
      this.closed = true;
    }, 70);
  }

  Open() {
    if (!this.closed) return;
    this.closed = false;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 70);
  }

  SetOpenDirection(el: HTMLElement) {
    const parent: HTMLElement | null | undefined =
      el.offsetParent?.parentElement;
    if (parent) {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const distances: distances = {
        bottom: parentRect.bottom - elRect.bottom,
        left: elRect.left - parentRect.left,
        top: elRect.top - parentRect.top,
        right: parentRect.right - elRect.right
      };
      if (distances[this.direction as keyof distances] > 150) {
        if (this.direction === "bottom" || this.direction === "top") {
          this.axisSettings.y = this.direction;
        } else {
          this.axisSettings.x = this.direction;
        }
      }
      Object.entries(distances).forEach(([key, val]) => {
        if (
          val > 150 &&
          (key != this.axisSettings.x || key != this.axisSettings.y)
        ) {
          if (key === "bottom" || key === "top") {
            this.axisSettings.y = key;
          } else {
            this.axisSettings.x = key;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dropDown {
  position: relative;
  .dropDown__mainButton {
    display: inline-block;
  }
  .dropDown__mainButton_default {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #d8d8d8;
    background-color: white;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    user-select: none;
  }

  .dropDown__content {
    position: absolute;
    width: 16rem;
    border-radius: 0.25rem;
    border: 1px solid #d8d8d8;
    background-color: white;
    padding: 0.375rem 0;
    margin-top: 0.5rem;
    .dropDown__default-content-wrap {
      display: flex;
      flex-direction: column;
      * {
        color: #374151;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        line-height: 1.25rem;
        display: block;
        text-decoration: none;
        background-color: white;
        border: none;
        text-align: center;
        cursor: pointer;
        &:hover {
          background-color: #f4f5f7;
          background-color: rgba(244, 245, 247, 1);
        }
      }
    }
  }
  .dropDown__content_closed {
    display: none;
  }
  .hide {
    animation: 0.2s linear hide;
  }
  .show {
    animation: 0.2s linear alternate-reverse hide;
  }
  .right {
    left: 0;
  }
  .left {
    right: 0;
  }
  .bottom {
    top: auto;
  }
  .top {
    bottom: calc(100% + 0.5rem);
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    transform: translate(0, 0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(0, -20px) scale(0.8);
  }
}
</style>

