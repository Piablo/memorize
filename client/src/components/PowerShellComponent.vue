<template>
    <div class="powershell-main-backing-panel">
        <div class="powershell-header-backing-panel"></div>
        <div class="powershell-body-backing-panel"></div>
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
            title: ''
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
.powershell-header-backing-panel{
    height: 20px;
    background-color: white;
}
.powershell-body-backing-panel{
    height: 100px;
    background-color: rgba(1, 36, 86);
}
.powershell-main-backing-panel{
    background-color: rgba(24, 131, 215);
    padding: 1px;
}


</style>
