<template>
  <div>
    <PanelComponent :props="loginPanelComponentProps"></PanelComponent>
    <TextInputComponent></TextInputComponent>   
  </div>
</template>

<script>

//Components 
import TextInputComponent from '@/components/TextInputComponent';
import PanelComponent from '@/components/PanelComponent';

//Services
import { bus } from '@/services/Bus';
import ValidateUserService from '@/services/ValidateUserService';

export default {

  components:{
    TextInputComponent,
    PanelComponent
  },
  
  data() {
    return {
      loginPanelComponentProps: {
        title: "Enter Login Details"
      }
    }
  },

  created(){
    // bus.$on(this.loginButtonProps.name + "OnClick", (data) => {
    //   this.getDataFromChildComponents();
    // })

  

  },

  beforeDestroy() {
    //bus.$off(this.loginButtonProps.name + "OnClick");
  },

  methods: {

  }
}

</script>
