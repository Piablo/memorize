<template>
    <div class="left-nav-backing-panel">
        <h3>Template</h3>
        <div class="slide-backing-panel" v-bind:style="{ 'background-color': slide.color}" v-for="(slide, index) in allSlides" :key="index">
            <v-layout row wrap>
                <v-flex xs11>
                    <div class="slide-content-backing-panel" @click="setActiveSlide(index)">
                        <SlideDisplay :props="index"></SlideDisplay>
                    </div>
                </v-flex>
                <v-flex xs1>
                    <v-flex xs12>
                        <v-icon @click="insertSlide(index)">add_circle</v-icon>
                    </v-flex>
                    <v-flex xs12>
                        <v-icon @click="deleteSlide(index)">delete</v-icon>
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
import SlideDisplay from '@/components/SlideDisplay';

export default {
    name: "Template",

    props: [
        'props'
    ],

    components: {
        SlideDisplay
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
            'insertSlideAt',
            'setActiveSlideToStore'
        ]),

        setActiveSlide(slideIndex){
            this.allSlides[this.previouslyActiveSlideIndex].color = "blue";
            this.allSlides[slideIndex].color = "red";

            this.setActiveSlideToStore(slideIndex);

            this.previouslyActiveSlideIndex = slideIndex;
        },

        deleteSlide(index){
            this.deleteSlideAt(index);

            if(index <= this.previouslyActiveSlideIndex){
                this.previouslyActiveSlideIndex --;
            }

            this.setActiveSlide(this.previouslyActiveSlideIndex);
        },

        insertSlide(index){
            this.insertSlideAt(index)

            if(index <= this.previouslyActiveSlideIndex){
                this.previouslyActiveSlideIndex ++;
            }
            
            this.setActiveSlide(this.previouslyActiveSlideIndex);

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
