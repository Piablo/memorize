<template>
  <div>
    <v-layout row wrap class="add-word-container">
      <v-flex xs9>
        <TextInputComponent :props="addWordTextInputProps"></TextInputComponent>
      </v-flex>

      <v-flex xs3>
        <ButtonComponent :props="addVerbatimWordButtonProps"></ButtonComponent>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  //Components
  import TextInputComponent from '@/components/TextInputComponent';
  import ButtonComponent from '@/components/ButtonComponent';

  //Services
  import { bus } from '@/services/Bus';

  export default {
    props: [
      'props'
    ], 

    components: {
      TextInputComponent,
      ButtonComponent
    },

    data() {
      return {
        name: this.props.name,
        addWordTextInputProps: {
          name: this.props.name + "AddVerbatimWordTextInput",
          label: "Add word"
        },

        addVerbatimWordButtonProps: {
          name: this.props.name + "AddVerbatimWordButton",
          label: "Add"
        }

      }
    },

    mounted() {
    },

    created() {
      bus.$on(this.addWordTextInputProps.name + "FromChild", (payload) => {
        if(payload.isValid){
          var userEnteredWord = payload.data;
          this.sendWordToparent(userEnteredWord);
        }
      }),

      bus.$on(this.addVerbatimWordButtonProps.name + "OnClick", (payload) => {
        this.getWordFromTextField();
      })

    },
    beforeDestroy() {
      bus.$off(this.addWordTextInputProps.name + "FromChild");
      bus.$off(this.addVerbatimWordButtonProps.name + "OnClick");
    },

    methods:{
      sendWordToparent(word){
        bus.$emit(this.name + "FromChild", word);
      },

      getWordFromTextField(){
        var payload = {
          command: "GetData"
        }
        bus.$emit(this.addWordTextInputProps.name + "FromParent", payload);
        this.setTextField("");
        
      },

      setTextField(word){
        var payload = {
          command: "SetField",
          data: word
        }
        bus.$emit(this.addWordTextInputProps.name + "FromParent", payload)
      }

    }
  }
</script>

<style>
.add-word-container{
  background-color: blue;
  padding: 5px;
  height: 60px;
}

</style>
