<template>
  <div>
    <div class="panel-component-header-styles">{{title}}</div>
    <div class="panel-component-backing-panel-styles">
      <div class="panel-component-data-display-panel-styles">dave</div>
    </div>
  </div>
</template>

<script>

//Components 


//Services
import { bus } from '@/services/Bus';
import ValidateUserService from '@/services/ValidateUserService';

export default {
  props:[
    'props'
  ],

  components:{
  },
  
  data() {
    return {
      title: this.props.title,
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

<style>
.panel-component-header-styles{
  background-color: grey;
  font-size: 20px;
  text-align: center;
  padding: 5px;
}
.panel-component-backing-panel-styles{
  background-color: grey;
  padding: 5px;
}
.panel-component-data-display-panel-styles{
  background-color: white;
}
</style>
