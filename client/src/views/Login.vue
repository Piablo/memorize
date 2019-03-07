<template>
  <div>
    <v-layout row wrap>
      <v-container grid-list-md text-xs-center>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs2>
          </v-flex>

          <v-flex xs8>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-text class="px-0"><h1>Enter login details</h1></v-card-text>
                </v-card>

                <v-card>
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <TextInputComponent :props="emailTextFieldInputProps"></TextInputComponent>
                      </v-flex>

                      <v-flex xs12>
                        <PasswordComponent :props="passwordComponentProps"></PasswordComponent>
                      </v-flex>

                      <v-flex xs12>
                        <ButtonComponent :props="loginButtonProps"></ButtonComponent>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
            
          </v-flex>

          <v-flex xs2>
          </v-flex>

        </v-layout>
      </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>

//Components 
import TextInputComponent from '@/components/TextInputComponent';
import ButtonComponent from '@/components/ButtonComponent';
import PasswordComponent from '@/components/PasswordComponent';

//Services
import { bus } from '@/services/Bus';
import ValidateUserService from '@/services/ValidateUserService';

export default {

  components:{
    TextInputComponent,
    ButtonComponent,
    PasswordComponent
  },
  
  data() {
    return {
      emailTextFieldInputProps: {
        label: "name@email.com",
        name: "EmailInputField"
      },
      loginButtonProps: {
        label: "Login",
        name: "LoginButton"
      },
      passwordComponentProps:{
        label: "password",
        name: "PasswordInput"
      },

      userInputs: {
        emailAddress: "",
        password: ""
      }
    }
  },

  created(){
    bus.$on(this.loginButtonProps.name + "OnClick", (data) => {
      this.getDataFromChildComponents();
    })

    bus.$on(this.emailTextFieldInputProps.name + "FromChild", (payload) => {
      this.userInputs.emailAddress = payload.data;
      this.validateForm();
    }),

    bus.$on(this.passwordComponentProps.name + "FromChild", (payload) => {
      this.userInputs.password = payload.data;
      this.validateForm();
    })
  },

  beforeDestroy() {
    bus.$off(this.loginButtonProps.name + "OnClick");
    bus.$off(this.emailTextFieldInputProps.name + "FromChild");
    bus.$off(this.passwordComponentProps.name + "FromChild");
  },

  methods: {
    getDataFromChildComponents(){
      var payload = {
        command: "GetData"
      }
      bus.$emit(this.emailTextFieldInputProps.name + "FromParent", payload);
      bus.$emit(this.passwordComponentProps.name + "FromParent", "GetData");
    },

    validateForm(){

      var componentState = true;
      var model = this.userInputs;
      for (var key in model) {
        if (model.hasOwnProperty(key)) {
          if(model[key] === ""){
            componentState = false;
          };
        }
      }
      if(componentState){
        this.attemptLogin();
      }
    },

    async attemptLogin(){
      var payload = {
        emailAddress: this.userInputs.emailAddress,
        password: this.userInputs.password
      }
      var token = (await ValidateUserService.index(payload)).data;
      if(token !== 'Auth failed'){
        localStorage.setItem('memorizeAppToken', token);
        this.$router.push('./');
      }
    }

  }
}

</script>
