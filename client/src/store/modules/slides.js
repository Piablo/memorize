import axios from 'axios';

const state = {
    slides: []
};

const getters = {
    allSlides: (state) => state.slides
};

const actions = {
    async fetchSlides({ commit }){
        //const response  = await axios.get('https://jsonplaceholder.typicode.com/todos');

        var slides = [
            {name: "slide 1", color: "blue"},
            {name: "slide 2", color: "blue"},
            {name: "slide 3", color: "blue"},
            {name: "slide 4", color: "blue"}
        ]

        commit('setSlides', slides);
    },

    deleteSlideAt({ commit }, index){
        commit('slideToDeleteIndex', index);
    },

    insertSlideAt({ commit }, index){
        commit('insertSlide', index);
    }

    // async addTodo({ commit }, title){
    //     const reponse = await axios.post('https://jsonplaceholder.typicode.com/todos', { title,
    //     completed: false});

    //     commit('newTodo', reponse.data);
    // }
};

var newSlide = {
    name: "newSlide",
    color: "blue"
}

const mutations = {
    setSlides: (state, slides) => (state.slides = slides),
    //newTodo: (state, todo) => state.todos.unshift(todo),
    slideToDeleteIndex: (state, index) => (state.slides.splice(index, 1)),

    insertSlide: (state, index) => (state.slides.splice(index, 0, newSlide))
};

export default {
    state,
    getters,
    actions,
    mutations
};