<template>
    <div>
        <v-btn
            @click="onClick">
                {{label}}
        </v-btn>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
import { bus }from '@/services/Bus';

//Components

export default {

    props: [
        'props'
    ],

    components: {

    },

    data(){
        return {
            label: this.props.label,
            name: this.props.name
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])

        onClick(){
            bus.$emit(this.name + "onClick", true);
        }
    },

    //computed: mapGetters(['allTodos']),

    created(){
        //this.fetchTodos();
        console.log("The name of this component is: ")
        console.log(this.name);
    }
    
}
</script>

<style>


</style>
