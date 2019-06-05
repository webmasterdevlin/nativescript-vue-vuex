// single-file module
import * as types from "@/store/types";
import * as axios from "axios/dist/axios";
import BaseUrl from "./api-config";

const state = {
  todos: [],
  todo: {},
  isLoading: false,
  errorMessage: ""
};

const mutations = {
  [types.MUTATE_GET_TODOS](state, todos) {
    state.todos = todos;
  },

  [types.MUTATE_GET_TODO](state, todo) {
    state.todo = todo;
  },

  [types.MUTATE_ADD_TODO](state, todoData) {
    state.todos.unshift(todoData);
  },

  [types.MUTATE_UPDATE_TODO](state, todo) {
    const index = state.todos.findIndex(v => v.id === todo.id);
    state.todos[index] = todo;
  },

  [types.MUTATE_REMOVE_TODO](state, id) {
    const index = state.todos.findIndex(v => v.id === id);
    alert(index);
    state.todos.splice(index, 1);
  },

  [types.MUTATE_TOGGLE_ISLOADING](state) {
    state.isLoading = !state.isLoading;
  }
};

const actions = {
  [types.ACTION_GET_TODOS]({ commit }) {
    return axios
      .get(BaseUrl.todos)
      .then(response => {
        commit(types.MUTATE_GET_TODOS, response.data.data);
        return Promise.resolve();
      })
      .catch(err => {
        alert("Something happened: " + err);
      });
  },
  [types.ACTION_GET_TODO]({ commit }, id) {
    return axios.get(`${BaseUrl.todos}/${id}`).then(response => {
      commit(types.MUTATE_GET_TODO, response.data).catch(err => {
        alert("Something happened: " + err);
      });
      return Promise.resolve();
    });
  },
  [types.ACTION_ADD_TODO]({ commit }, todoData) {
    return axios.post(BaseUrl.todos, todoData).then(response => {
      commit(types.MUTATE_ADD_TODO, response.data).catch(err => {
        alert("Something happened: " + err);
      });
      return Promise.resolve();
    });
  },
  [types.ACTION_UPDATE_TODO]({ commit }, todo) {
    commit(types.MUTATE_TOGGLE_ISLOADING);
    return axios
      .put(`${BaseUrl.todos}/${todo.id}`, todo)
      .then(response => {
        commit(types.MUTATE_UPDATE_TODO, response.data);
      })
      .then(() => {
        commit(types.MUTATE_TOGGLE_ISLOADING);
        return Promise.resolve();
      })
      .catch(err => {
        alert("Something happened: " + err);
        commit(types.MUTATE_TOGGLE_ISLOADING);
      });
  },

  [types.ACTION_REMOVE_TODO]({ commit }, todo) {
    return axios.delete(`${BaseUrl.todos}/${todo.id}`).then(() => {
      commit(types.MUTATE_REMOVE_TODO, todo.id).catch(err => {
        alert("Something happened: " + err);
      });
      return Promise.resolve();
    });
  }
};

const getters = {
  [types.GETTERS_INIT_TODOS]: state => state.todos,
  [types.GETTERS_INIT_TODO]: state => state.todo,
  [types.GETTERS_ISLOADING]: state => state.isLoading
};

export default {
  state,
  mutations,
  actions,
  getters
};
