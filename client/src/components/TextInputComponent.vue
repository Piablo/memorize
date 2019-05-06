<template>
    <div class="text-field-backing-panel">
        <v-text-field
            :label="label"
            solo>
        </v-text-field>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components

export default {
    name: "LeftNavComponent",

    props: [
        'props'
    ],

    components: {

    },

    data(){
        return {
            label: this.props.label
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
.text-field-backing-panel{
    padding: 5px;
    background-color: pink;
    height: 58px;
}

</style>
