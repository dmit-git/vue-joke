import types from "./mutation-types";


// https://api.chucknorris.io/jokes/random

export default {
    fetchRandJoke({ commit }){
        fetch('https://api.chucknorris.io/jokes/random', {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then((json) => {
            console.log(json, "response");
            commit(types.INIT_JOKES, [json]);
        });
    }
}
