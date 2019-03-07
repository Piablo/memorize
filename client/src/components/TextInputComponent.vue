<template>
  <v-text-field
    v-model="userInput"
    :label="label"
    solo>
  </v-text-field>

</template>

<script>

  //Services
  import { bus } from '@/services/Bus';

  export default {
    props: [
      'props'
    ],
    data() {
      return {
        label: this.props.label,
        name: this.props.name,
        userInput: "",
        componentIsValid: false,
      }
    },
    created(){
      bus.$on(this.name + "FromParent", (payload) => {
        //This has been changed and errors will be thrown.
        var command = payload.command;
        if(command === "GetData"){
          this.sendDataToParent();
        }
        else if(command === "SetField"){
          this.userInput = payload.data;
        }
        else if(command === "DisableField"){
          debugger;
        }
        
      })

      //bus.$off(this.name + "FromParent")
    },
    beforeDestroy() {
      bus.$off(this.name + "FromParent");
    },

    methods: {
      sendDataToParent(){
        var payload = {
          isValid: false,
          data: ""
        }
        if(this.userInput.length > 0){
          payload.isValid = true;
          payload.data = this.userInput
        }
        bus.$emit(this.name + "FromChild", payload);
      }
    }
    
  }
</script>

<style>

</style>
