<template>
    <div class="current-slide-backing-panel">
        <div v-if="isPowerShellComponent(props.type)"><PowerShellComponent :props="props"></PowerShellComponent></div>
    </div>
</template>

<script>

//Vuex
import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';
import PowerShellComponent from '@/components/PowerShellComponent';

//Components

export default {

    props: [
        'props'
    ],

    components: {
        PowerShellComponent
    },

    data(){
        return {
            showPowerShell: false
        }
    },

    methods: {
        //...mapActions(['editSlide'])

        isPowerShellComponent(type){
            if(type === "PowerShell"){
                return true;
            }
        }
        
    },

    //computed: mapGetters(['allSlides']),

    created(){
        console.log("The props are: ")
        console.log(this.props)
    }
    
}
</script>

<style>
.current-slide-backing-panel{
    background-color: gold;
}

</style>
