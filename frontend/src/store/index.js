import Vue from 'vue'
import Vuex from 'vuex'
import { UserAPI } from '@/api/device_api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    }
  },
  actions: {
    login(store, credentials) {
      console.log("STORE LOGIN");
      // send data to backend
      UserAPI.login(credentials.email, credentials.password)
        .then((res) => {
          console.log("Response: ", res.data);
          store.commit('set_user', res.data);
        })
        .catch((err) => {
          console.log("Error: ", err.body);
        });
    },
    logout(store) {
      console.log("STORE LOGOUT");
      UserAPI.logout()
        .then((res) => {
          console.log("Response: ", res);
          store.commit('set_user', undefined);
        })
        .catch((err) => {
          console.log("Error: ", err);
        })
    }
  },
  computed: {
    get_credentials() {
      return this.$store.state.user;
    }
  }
})
