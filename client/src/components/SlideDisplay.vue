<template>
    <div class="current-slide-backing-panel">{{title}}
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
            slideIndex: this.props,
            title: null
        }
    },

    methods: {
        //...mapActions(['fetchSlideAt'])
        
    },

    computed: mapGetters(['allSlides']),

    created(){
        this.title = this.allSlides[this.slideIndex].name
    }
    
}
</script>

<style>
.current-slide-backing-panel{
    background-color: gold;
}

</style>
