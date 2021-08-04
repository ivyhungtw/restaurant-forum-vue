import { createStore } from 'vuex';
import usersAPI from '../apis/users';

export default createStore({
  state() {
    return {
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false
      },
      isAuthenticated: false
    };
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      };
      state.isAuthenticated = true;
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser();

        if (data.status === 'error') {
          throw new Error(data.message);
        }

        const { id, name, email, image, isAdmin } = data;

        // call mutation
        commit('setCurrentUser', { id, name, email, image, isAdmin });
      } catch (err) {
        console.log(err.message);
      }
    }
  },
  modules: {}
});
