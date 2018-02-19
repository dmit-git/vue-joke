import Vue from 'vue';
import * as _ from "lodash";
import localforage from "localforage";
import types from "./mutation-types";

export const mutations = {
    [types.ADD_JOKE](state, payload) {
        if(state.jokes.filter(joke => joke.id === payload.id ).length === 0){
            if(payload.category == null){
                payload.category = 'uncategorized';
            }
            const indexInFavs = state.favorites.findIndex(val => val.id === payload.id);
            payload.fav = indexInFavs>-1;
            const jokes = _.cloneDeep(state.jokes);
            jokes.push(payload);
            Vue.set(state, 'jokes', jokes);
        }else {
            console.log("Joke is already fetched");
        }        
    },
    [types.BATCH_ADD](state, payload) {
        const jokes = payload.map((joke)=>{
            if (joke.category == null) {
                joke.category = 'uncategorized';
            }
            const indexInFavs = state.favorites.findIndex(val => val.id === joke.id);
            joke.fav = indexInFavs>-1;
            return joke;
        });
        Vue.set(state, 'jokes', jokes);
    },
    [types.LOAD_CATEGORIES](state, payload) {
        state.categories.push(...payload);
    },
    [types.SELECTED_CATEGORY](state, payload) {
        Vue.set(state, 'selectedCategory', payload);
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
    },
    [types.REMOVE_FROM_FAVORITES](state, joke) {
        const index = state.favorites.findIndex(val => val.id === joke.id);
        state.favorites.splice(index, 1);
    },
    [types.TOGGLE_FAV](state, joke) {
        var tempJoke = Object.assign({}, joke);
        tempJoke.fav = typeof tempJoke.fav !== 'undefined' ? !tempJoke.fav : true;
        const indexInJokes = state.jokes.findIndex(val => val.id === joke.id);
        const indexInFavs = state.favorites.findIndex(val => val.id === joke.id);
        if(indexInJokes === -1){
            state.jokes.push(tempJoke);
        } else {
            Vue.set(state.jokes, indexInJokes, tempJoke);
        }        
        if(tempJoke.fav){
            state.favorites.push(tempJoke);
        } else {
            state.favorites.splice(indexInFavs, 1);
        }
        localforage.clear().then(()=>{
            localforage.setItem('favorites', state.favorites);
        });        
    },
    [types.LOCAL_JOKES](state, jokes) {
        state.favorites.push(...jokes);
    },
    [types.REMOVE_JOKE_BY_ID](state, id) {
        const index = state.jokes.findIndex(val => val.id === id);
        var jokes = _.cloneDeep(state.jokes);
        jokes.splice(index, 1);
        Vue.set(state, 'jokes', jokes);
    },
};