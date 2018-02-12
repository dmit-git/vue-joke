import types from "./mutation-types";

export const mutations = {
    [types.ADD_JOKE](state, payload) {
        state.jokes.push(...payload);
    },
    [types.LOAD_CATEGORIES](state, payload) {
        state.categories.push(...payload);
    },
    [types.SELECTED_CATEGORY](state, payload) {
        state.selectedCategory = payload;
    },
    [types.LOADING_ON](state) {
        state.loading = true;
    },
    [types.LOADING_OFF](state) {
        state.loading = false;
    },
};