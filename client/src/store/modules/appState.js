import axios from 'axios';

const state = {
    //todos: []
    addSlideButtonState: true
};

const getters = {
    //allTodos: (state) => state.todos
    currentaddSlideButtonState: (state) => state.addSlideButtonState
};

const actions = {
    async setStateTest({ commit }, currentSate){
        //const response  = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit('newAddSlideButtonState', currentSate);
    },

    // async addTodo({ commit }, title){
    //     const reponse = await axios.post('https://jsonplaceholder.typicode.com/todos', { title,
    //     completed: false});

    //     commit('newTodo', reponse.data);
    // }
};

const mutations = {
    // setTodos: (state, todos) => (state.todos = todos),
    // newTodo: (state, todo) => state.todos.unshift(todo)

    newAddSlideButtonState: (state, addSlideButtonState) => (state.addSlideButtonState = addSlideButtonState)
};

export default {
    state,
    getters,
    actions,
    mutations
};