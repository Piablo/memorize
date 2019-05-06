<template>
    <div>
        <div v-if="isPowerShellComponent(props.type)">
            <PowerShellEditor></PowerShellEditor>
        </div>
    </div>
</template>

<script>

//Vuex
//import { mapGetters, mapActions } from 'vuex';

//Services
//import { bus }from '@/services/Bus';

//Components
import PowerShellEditor from "@/components/PowerShellEditor";

export default {
    name: "LeftNavComponent",

    props: [
        'props'
    ],

    components: {
        PowerShellEditor
    },

    data(){
        return {
            title: ''
        }
    },

    methods: {
        //...mapActions(['fetchTodos'])

        isPowerShellComponent(type){
            if(type === "PowerShell"){
                return true;
            }
        }
    },

    //computed: mapGetters(['allTodos']),

    created(){
        console.log("Hello from SlideEditor")
        console.log(this.props)
    }
    
}
</script>

<style>


</style>
