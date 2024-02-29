import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixins from "./mixins";

createApp(App).mixin(mixins).use(store).use(router).mount("#app");

window.Kakao.init("88cfdfac0fe43f951da62d02a7b0fc35");
