import { createStore } from "vuex";
//vuex-persistedstate는 state 값을 브라우저의 localstorage에 업데이트 해주는 플러그인
import persistedstate from "vuex-persistedstate";

export default createStore({
  state() {
    return {
      user: {},
    };
  },
  getters: {},
  mutations: {
    user(state, data) {
      state.user = data;
    },
  },
  actions: {},
  modules: {},

  plugins: [
    persistedstate({
      paths: ["user"],
    }),
  ],
});
