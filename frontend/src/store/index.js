import Vue from 'vue'
import Vuex from 'vuex'
import { UserAPI } from '@/api/device_api.js'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: undefined,
    error: undefined,
    showLogin: false
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
    set_error(state, error) {
      state.error = error;
    },
    set_show_login(state, show) {
      state.showLogin = show;
    }
  },
  actions: {
    login(store, credentials) {
      // send data to backend
      return UserAPI.login(credentials.email, credentials.password)
        .then((res) => {
          store.commit('set_user', res.data);
          store.commit('set_error', undefined);
          store.commit('set_show_login', false);
        })
        .catch((err) => {
          store.commit('set_error', err);
        });
    },
    logout(store) {
      UserAPI.logout()
        .then(() => {
          store.commit('set_user', undefined);
        })
        .catch((err) => {
          console.log("Error: ", err);
        })
    }
  },
  getters: {
    get_credentials(state) {
      return state.user.firstname[0] + state.user.lastname[0];
    }
  }
})
