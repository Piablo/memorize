<template>
    <div class="new-slide-component-backing-panel">
        <div class="new-slide-component-header">
            <v-layout row wrap>
                <ButtonComponent :props="addPowershellTemplateButtonComponentProps"></ButtonComponent>
                <ButtonComponent :props="testingProps"></ButtonComponent>
            </v-layout>
        </div>
        <div class="new-slide-component-body-backing-panel">
            <div class="new-slide-component-content-backing-panel">
                <v-layout row wrap>
                    <v-flex xs9>
                        <SlideDisplay :props="getActiveSlide"></SlideDisplay>
                    </v-flex>
                    <v-flex xs3>
                        <SlideEditor :props="getActiveSlide"></SlideEditor>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </div>
</template>

<script>

//Vuex
import { mapGetters, mapActions } from 'vuex';

//Services
import { bus }from '@/services/Bus';

//Components
import ButtonComponent from '@/components/ButtonComponent';
import SlideDisplay from '@/components/SlideDisplay';
import SlideEditor from '@/components/SlideEditor';

export default {
    name: "NewSlideComponent",

    props: [
        'props'
    ],

    components: {
        ButtonComponent,
        SlideDisplay,
        SlideEditor
    },

    data(){
        
        return {
            showNewPowerShellTemplate: false,
            resetting: false,

            addPowershellTemplateButtonComponentProps:{
                name: "addPowershellTemplateButtonComponent",
                label: "PowerShell"
            },

            testingProps:{
                name: "testing",
                label: "testing"
            }
        }
    },

    methods: {
        //...mapActions(['activeSlide']),

        ...mapActions(['editSlide']),

        showTemplate(selectedTemplate){
            this.showNewPowerShellTemplate = false;

            var payload = {
                index: null,
                type: null,
                data: null
            }

            if(selectedTemplate === "PowerShell"){
                this.showNewPowerShellTemplate = true;
                payload.index = this.getActiveSlide.index,
                payload. type = "PowerShell",
                payload.data = "dave"
                
                
            }else if(selectedTemplate === "testing"){
                payload.index = this.getActiveSlide.index,
                payload. type = "testing",
                payload.data = "dave"
            }

            this.editSlide(payload);

        }
    },

    computed: mapGetters(['getActiveSlide']),

    created(){
        bus.$on("addPowershellTemplateButtonComponent" + "onClick", (state) => {
            this.showTemplate("PowerShell");
        }),

        bus.$on("testing" + "onClick", (state) => {
            this.showTemplate("testing");
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
