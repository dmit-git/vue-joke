import types from "./mutation-types";
import getters from './getters';


// https://api.chucknorris.io/jokes/random

export default {
    fetchRandJoke({ commit }){
        commit(types.LOADING_ON);
        const selectedCategory = this.getters.selectedCategory;
        const categoryString = selectedCategory != '' && selectedCategory != 'uncategorized'  ? `?category=${selectedCategory}` : '';
        fetch(`https://api.chucknorris.io/jokes/random${categoryString}`, {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then((json) => {
            commit(types.ADD_JOKE, json);
            commit(types.LOADING_OFF);
        }); 
    },
    fetchCategories({ commit }){
        fetch('https://api.chucknorris.io/jokes/categories', {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then((json) => {
            commit(types.LOAD_CATEGORIES, json);
        });
    },
    setCategory({ commit }, category){
        commit(types.SELECTED_CATEGORY, category);
    },
    searchJoke({ commit }, searchQuery){        
        commit(types.LOADING_ON);
        fetch(`https://api.chucknorris.io/jokes/search?query=${searchQuery}`, {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then((json) => {
            commit(types.EMPTY_JOKES);            
            commit(types.BATCH_ADD, json.result);
            commit(types.LOADING_OFF);
        });
    },
    addToFavorites({ commit }, joke) {
        commit(types.ADD_TO_FAVORITES, joke);
    },
    toggleFavorites({ commit }, joke) {
        commit(types.TOGGLE_FAV, joke);
    },
    localFavorites({ commit }, jokes) {
        commit(types.LOCAL_JOKES, jokes);
    },
    clearJokesList({ commit }) {
        commit(types.EMPTY_JOKES);
    },
    removeJokeById({commit}, id) {
        commit(types.REMOVE_JOKE_BY_ID, id);
    }
};
