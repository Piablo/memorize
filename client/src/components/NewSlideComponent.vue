<template>
    <div class="new-slide-component-backing-panel">
        <div class="new-slide-component-header">
            <ButtonComponent :props="addPowershellTemplateButtonComponentProps"></ButtonComponent>
        </div>
        <div class="new-slide-component-body-backing-panel">
            <div class="new-slide-component-content-backing-panel">
                <v-layout row wrap>
                    <v-flex xs9>
                        <CurrentSlide></CurrentSlide>
                    </v-flex>
                    <v-flex xs3>
                        <div class="new-powershell-template" v-if="showNewPowerShellTemplate">powershelltemplate</div>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
import { bus }from '@/services/Bus';

//Components
import ButtonComponent from '@/components/ButtonComponent';
import CurrentSlide from '@/components/CurrentSlide';

export default {
    name: "NewSlideComponent",

    props: [
        'props'
    ],

    components: {
        ButtonComponent,
        CurrentSlide
    },

    data(){
        
        return {
            showNewPowerShellTemplate: false,

            addPowershellTemplateButtonComponentProps:{
                name: "addPowershellTemplateButtonComponent",
                label: "PowerShell"
            }
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])

        showTemplate(selectedTemplate){
            this.showNewPowerShellTemplate = false;

            if(selectedTemplate === "PowerShell"){
                this.showNewPowerShellTemplate = true;
            }

        }
    },

    //computed: mapGetters(['allTodos']),

    created(){
        //this.fetchTodos();

        bus.$on("addPowershellTemplateButtonComponent" + "onClick", (state) => {
            this.showTemplate("PowerShell");
        })
    }
    
}
</script>

<style>
.new-slide-component-backing-panel{
    background-color: lightpink;
    height: 500px;
    margin: 5px;
    margin-left: 0px;
}

.new-slide-component-header{
    background-color: lightgreen;
    height: 48px;
}
.new-slide-component-body-backing-panel{
    background-color: lightgreen;
    padding: 5px;
    height: 400px;
}
.new-slide-component-content-backing-panel{
    background-color: green;
    height: 390px;
}
</style>
