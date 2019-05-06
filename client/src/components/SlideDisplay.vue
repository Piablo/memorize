<template>
    <div class="current-slide-backing-panel">
        {{props.name}}
        {{props.type}}
    </div>
</template>

<script>

//Vuex
import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components

export default {

    props: [
        'props'
    ],

    components: {
        
    },

    data(){
        return {
            dave: "p[aul"
        }
    },

    methods: {
        //...mapActions(['editSlide'])
        
    },

    //computed: mapGetters(['allSlides']),

    created(){
        
    }
    
}
</script>

<style>
.current-slide-backing-panel{
    background-color: gold;
}

</style>
