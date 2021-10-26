const state = () => ({
  items: [],
});

const getters = {
  getTodos: (state) => state.items,
};

const actions = {
  createTodo({ commit }, todo) {
    commit("CREATE_TODO", todo);
    commit("UPDATE_LOCALSTORAGE");
  },

  loadTodo({ commit }) {
    const todos = localStorage.getItem("todos");

    if (todos) {
      commit("LOAD_TODO", JSON.parse(todos));
    }
  },

  removeTodo({ commit }, todo) {
    commit("REMOVE_TODO", todo);
    commit("UPDATE_LOCALSTORAGE");
  },

  updateTodo({ commit }, todo) {
    commit("UPDATE_TODO", todo);
    commit("UPDATE_LOCALSTORAGE");
  },
};

const mutations = {
  CREATE_TODO: (state, todo) => {
    state.items.push(todo);
  },

  UPDATE_LOCALSTORAGE: (state) => {
    localStorage.setItem("todos", JSON.stringify(state.items));
  },

  LOAD_TODO: (state, todos) => {
    state.items = todos;
  },

  REMOVE_TODO: (state, todo) => {
    const index = state.items.indexOf(todo);
    state.items.splice(index, 1);
  },

  UPDATE_TODO: (state, todo) => {
    const index = state.items
      .map((x) => {
        return x.id;
      })
      .indexOf(todo.id);

    state.items[index] = { ...state.items[index], ...todo };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
