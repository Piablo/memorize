<template>
    <div class="left-nav-backing-panel">
        <h3>Template</h3>
        <div class="slide-backing-panel" v-bind:style="{ 'background-color': slide.color}" v-for="(slide, index) in allSlides" :key="index">
            <v-layout row wrap>
                <v-flex xs11>
                    <div class="slide-content-backing-panel" @click="setActiveSlide(index)">{{slide.name}}</div>
                </v-flex>
                <v-flex xs1>
                    <v-flex xs12>
                        <v-icon @click="insertSlideAt(index)">add_circle</v-icon>
                    </v-flex>
                    <v-flex xs12>
                        <v-icon @click="deleteSlideAt(index)">delete</v-icon>
                    </v-flex>
                </v-flex>
            </v-layout>
        </div>

    </div>
</template>

<script>

//Vuex
import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components

export default {
    name: "Template",

    props: [
        'props'
    ],

    components: {
    },

    data(){
        return {
            previouslyActiveSlideIndex: 0,

        }
    },

    methods: {
        ...mapActions([
            'fetchSlides', 
            'deleteSlideAt',
            'insertSlideAt'
        ]),

        setActiveSlide(slideIndex){
            this.allSlides[this.previouslyActiveSlideIndex].color = "blue";
            this.allSlides[slideIndex].color = "red";

            this.previouslyActiveSlideIndex = slideIndex;
        },

        addSlide(index){

        },
    },

    computed: mapGetters(['allSlides']),

    created(){
        this.fetchSlides();
        var activeSlideIndex = this.allSlides.length - 1
        this.setActiveSlide(activeSlideIndex);
    }
    
}
</script>

<style>

.left-nav-backing-panel{
    background-color: lightblue;
    height: 500px;
    margin: 5px
}
.slide-backing-panel{
    margin: 5px;
    height: 100px;
    padding: 5px;
}
.slide-content-backing-panel{
    
    background-color: lightslategrey;
    height: 100%;
}

</style>
