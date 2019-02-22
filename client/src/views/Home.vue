<template>
  <div>
    <HeaderToolbarComponent />
    <div v-if="showAddCardComponent">
      <AddCardComponent></AddCardComponent>
    </div>
    <div v-if="showDoTestComponent">
      <DoTestComponent></DoTestComponent> 
    </div>
  </div>
</template>

<script>

  //Vuex
  import { mapMutations } from 'vuex';

  //Components
  import HeaderToolbarComponent from '../components/HeaderToolbarComponent';
  import AddCardComponent from '../components/AddCardComponent';
  import DoTestComponent from '../components/DoTestComponent';

  //Services
  import { bus } from '@/services/Bus';
  import ValidateTokenService from '@/services/ValidateTokenService';

  export default {
    components: {
      HeaderToolbarComponent,
      AddCardComponent,
      DoTestComponent
    },

    data() {
      return{
        showAddCardComponent: false,
        showDoTestComponent: false,
        tokenDetails: ""
      }
    },
    mounted(){
      this.isUserLoggedIn();
    },

    created(){
      bus.$on("AddCardButtonClicked", (payload) => {
        this.setView("addCard");
      }),

      bus.$on("DoTestButtonClicked", (payload) => {
        this.setView("doTest");
      })
    },

    methods:{
      ...mapMutations([
        'SET_ELAPSED_DAYS',
      ]),

      setView(selector){
        this.showAddCardComponent = false;
        this.showDoTestComponent = false;
        if(selector === "addCard"){
          this.showAddCardComponent = true;
        }
        else if(selector === "doTest"){
          this.showDoTestComponent = true;
        }
      },

      async isUserLoggedIn(){
        //localStorage.setItem("memorizeAppToken", "dave")
        var token = localStorage.getItem("memorizeAppToken")
        var tokenIsValid = await this.validateToken(token);
        

        if(!tokenIsValid){
          this.$router.push('./login');
        }else{
          console.log(this.tokenDetails);
          this.SET_ELAPSED_DAYS(this.tokenDetails.elapsedDays)
        }
      },

      async validateToken(token){
        var payload = {
          token: token
        }
        var tokenIsValid = true;
        var serverResponse = (await ValidateTokenService.index(payload)).data;
        if(!serverResponse){
          tokenIsValid = false;
        }else{
          this.tokenDetails = serverResponse;
        }
        return tokenIsValid;
      }
    }
  }
</script>
