import types from "./mutation-types";
import getters from './getters';


// https://api.chucknorris.io/jokes/random

export default {
    fetchRandJoke({ commit }){
        commit(types.LOADING_ON);
        const selectedCategory = this.getters.selectedCategory;
        const categoryString = selectedCategory != '' ? `?category=${selectedCategory}` : '';
        fetch(`https://api.chucknorris.io/jokes/random${categoryString}`, {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then((json) => {
            commit(types.ADD_JOKE, [json]);
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
};
