<template>
    <div class="dashboard-backing-panel">
        <v-layout row wrap>
            <v-flex xs12>
                <Toolbar></Toolbar>
            </v-flex>
            <v-flex xs3>
                <LeftNavComponent></LeftNavComponent>
            </v-flex>
            <v-flex xs9>
                <div v-if="currentaddSlideButtonState">
                    <NewSlideComponent></NewSlideComponent>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

//Vuex
import { mapGetters, mapActions } from 'vuex';

//Services

//Components
import Toolbar from '@/components/Toolbar';
import NewSlideComponent from '@/components/NewSlideComponent';
import LeftNavComponent from '@/components/LeftNavComponent';

export default {
    name: "Dashboard",
    

    components: {
        Toolbar,
        NewSlideComponent,
        LeftNavComponent
    },

    data(){
        return {
            title: ''
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])
    },

    computed: mapGetters(['currentaddSlideButtonState']),

    created(){
    }
    
}
</script>

<style>
.dashboard-backing-panel{
    background-color: grey;
}


</style>
