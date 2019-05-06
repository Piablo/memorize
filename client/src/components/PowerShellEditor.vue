<template>
    <div>
        <TextInputComponent :props="directoryTextInputComponentProps"></TextInputComponent>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components
import TextInputComponent from "@/components/TextInputComponent";

export default {
    name: "LeftNavComponent",

    props: [
        'props'
    ],

    components: {
        TextInputComponent
    },

    data(){
        return {
            directoryTextInputComponentProps:{
                label: "dave"
            }
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])
    },

    //computed: mapGetters(['allTodos']),

    created(){
        //this.fetchTodos();
    }
    
}
</script>

<style>


</style>
