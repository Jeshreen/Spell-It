import { BRow, BCol, BContainer, BButton } from "bootstrap-vue";

const GlobalComponents = {
  install(Vue) {
    Vue.component("b-row", BRow);
    Vue.component("b-col", BCol);
    Vue.component("b-container", BContainer);
    Vue.component("b-button", BButton);
  }
};

export default GlobalComponents;