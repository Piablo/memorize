<template>
    <div class="current-slide-backing-panel">
        <div v-if="showPowerShellTemplate">dave</div>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components

export default {
    name: "CurrentSlide",

    props: [
        'props'
    ],

    components: {

    },

    data(){
        return {
            slideType: "",
            showPowerShellTemplate: false,
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])
        setSlideType(selectedTemplate){
            this.showPowerShellTemplate = false;

            if(selectedTemplate === "PowerShell"){
                this.showPowerShellTemplate = true;
            }
        }
    },

    //computed: mapGetters(['allTodos']),

    created(){
        this.setSlideType(this.slideType);
        //this.fetchTodos();
    }
    
}
</script>

<style>
.current-slide-backing-panel{
    background-color: gold;
}

</style>
