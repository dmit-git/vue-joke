import Vue from 'vue';
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
    [types.EMPTY_JOKES](state) {
        state.jokes.splice(0, state.jokes.length);
    },
    [types.ADD_TO_FAVORITES](state, joke) {
        var tempJoke = Object.assign({}, joke);
        const index = state.jokes.findIndex(val => val.id === joke.id);
        tempJoke.fav = typeof tempJoke.fav !== 'undefined' ? !tempJoke.fav : true;
        Vue.set(state.jokes, index, tempJoke);
        if(tempJoke.fav){
            state.favorites.push(tempJoke);
        }else{
            const indexInFavs = state.favorites.findIndex(val => val.id === tempJoke.id);
            state.favorites.splice(indexInFavs, 1);
        }
    },
    [types.REMOVE_FROM_FAVS](state, joke) {
        var tempJoke = Object.assign({}, joke);
        const indexInFavs = state.favorites.findIndex(val => val.id === tempJoke.id);
        state.favorites.splice(indexInFavs, 1);
    },
};