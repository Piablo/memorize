<template>
    <div class="toolbar-backing-styles">
        <ButtonComponent :props="newSlideButtonComponentProps"></ButtonComponent>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

//Services
import { bus }from '@/services/Bus';

//Components
import ButtonComponent from '@/components/ButtonComponent';

export default {
    name: "Toolbar",

    components: {
        ButtonComponent
    },

    data(){
        return {
            title: '',

            newSlideButtonComponentProps:{
                name: "newSlideButtonComponent",
                label: "Add Slide"
            }
        }
    },

    methods: {
        //...mapActions(['setStateTest'])
    },

    computed: mapGetters(['currentaddSlideButtonState']),

    created(){

        bus.$on("newSlideButtonComponent" + "onClick", (state) => {
            if(state){
            }
        })
    }
    
}
</script>

<style>

.toolbar-backing-styles{
    height: 50px;
    background-color: blue;
}

</style>
